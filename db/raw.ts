import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

type SqlValue = string | number | null | bigint;

type Prepared = {
  bind(...values: SqlValue[]): Prepared;
  first<T = Record<string, unknown>>(): Promise<T | null>;
  all<T = Record<string, unknown>>(): Promise<{ results: T[]; success: true }>;
  run(): Promise<{ success: true; meta: { changes: number } }>;
};

export type D1Like = {
  prepare(sql: string): Prepared;
  batch(
    statements: Array<
      Promise<{ success: true; meta: { changes: number } }> | Prepared
    >,
  ): Promise<Array<{ success: true; meta: { changes: number } }>>;
};

let nodeDb: D1Like | null = null;

function resolveSqlitePath(): string {
  return (
    process.env.CHOMBLY_SQLITE_PATH ||
    path.join(process.cwd(), "data", "chombly.sqlite")
  );
}

function applyMigrations(sqlite: DatabaseSync) {
  const directory = path.join(process.cwd(), "drizzle");
  if (!fs.existsSync(directory)) return;

  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS __chombly_migrations (
      id TEXT PRIMARY KEY NOT NULL,
      applied_at INTEGER NOT NULL
    );
  `);

  const applied = new Set(
    (
      sqlite.prepare("SELECT id FROM __chombly_migrations").all() as Array<{
        id: string;
      }>
    ).map((row) => row.id),
  );

  const files = fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".sql"))
    .sort();

  for (const file of files) {
    if (applied.has(file)) continue;
    const sql = fs.readFileSync(path.join(directory, file), "utf8");
    sqlite.exec("BEGIN");
    try {
      for (const statement of sql.split("--> statement-breakpoint")) {
        const trimmed = statement.trim();
        if (trimmed) sqlite.exec(trimmed);
      }
      sqlite
        .prepare(
          "INSERT INTO __chombly_migrations(id, applied_at) VALUES(?, ?)",
        )
        .run(file, Math.floor(Date.now() / 1000));
      sqlite.exec("COMMIT");
    } catch (error) {
      sqlite.exec("ROLLBACK");
      throw error;
    }
  }
}

function createNodeDatabase(filePath: string): D1Like {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const sqlite = new DatabaseSync(filePath);
  sqlite.exec("PRAGMA foreign_keys = ON;");
  applyMigrations(sqlite);

  const prepare = (sql: string, values: SqlValue[] = []): Prepared => ({
    bind(...nextValues: SqlValue[]) {
      return prepare(sql, nextValues);
    },
    async first<T = Record<string, unknown>>() {
      return (sqlite.prepare(sql).get(...values) as T) || null;
    },
    async all<T = Record<string, unknown>>() {
      return {
        results: sqlite.prepare(sql).all(...values) as T[],
        success: true as const,
      };
    },
    async run() {
      const result = sqlite.prepare(sql).run(...values);
      return {
        success: true as const,
        meta: { changes: Number(result.changes) },
      };
    },
  });

  return {
    prepare(sql: string) {
      return prepare(sql);
    },
    async batch(statements) {
      sqlite.exec("BEGIN");
      try {
        const out: Array<{ success: true; meta: { changes: number } }> = [];
        for (const statement of statements) {
          const result =
            "run" in statement && typeof statement.run === "function"
              ? await statement.run()
              : await statement;
          out.push(result);
        }
        sqlite.exec("COMMIT");
        return out;
      } catch (error) {
        sqlite.exec("ROLLBACK");
        throw error;
      }
    },
  };
}

function getOrCreateNodeDb(): D1Like {
  if (!nodeDb) {
    nodeDb = createNodeDatabase(resolveSqlitePath());
  }
  return nodeDb;
}

/** D1-compatible DB used by API routes. On Azure/Node uses SQLite file. */
export function database(): D1Like {
  const testDb = (
    globalThis as { __chombyTestEnv?: { DB?: D1Like } }
  ).__chombyTestEnv?.DB;
  if (testDb) return testDb;
  return getOrCreateNodeDb();
}

/** Runtime settings from process.env (App Service Application settings). */
export function settings(): Record<string, string | undefined> {
  const testEnv = (globalThis as { __chombyTestEnv?: Record<string, string> })
    .__chombyTestEnv;
  return {
    ...(testEnv ?? {}),
    ...process.env,
  } as Record<string, string | undefined>;
}
