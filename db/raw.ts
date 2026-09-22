import fs from "node:fs";
import path from "node:path";

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

type WorkerEnv = {
  DB?: D1Like;
  [key: string]: unknown;
};

let nodeDb: D1Like | null = null;
let workerEnv: WorkerEnv | null | undefined;
let workerEnvLoad: Promise<void> | null = null;

function loadWorkerEnv(): Promise<void> {
  if (!workerEnvLoad) {
    workerEnvLoad = import("cloudflare:workers")
      .then((mod) => {
        workerEnv = (mod as { env: WorkerEnv }).env ?? null;
      })
      .catch(() => {
        workerEnv = null;
      });
  }
  return workerEnvLoad;
}

/** Kick off Workers env resolution at module load (no-op on Azure Node). */
void loadWorkerEnv();

function resolveSqlitePath(): string {
  return (
    process.env.CHOMBLY_SQLITE_PATH ||
    path.join(process.cwd(), "data", "chombly.sqlite")
  );
}

async function createNodeDatabase(filePath: string): Promise<D1Like> {
  const { DatabaseSync } = await import("node:sqlite");
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

function applyMigrations(sqlite: {
  exec(sql: string): void;
  prepare(sql: string): {
    all: (...params: SqlValue[]) => unknown[];
    run: (...params: SqlValue[]) => unknown;
  };
}) {
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

let nodeDbLoad: Promise<D1Like> | null = null;

function getOrCreateNodeDb(): Promise<D1Like> {
  if (nodeDb) return Promise.resolve(nodeDb);
  if (!nodeDbLoad) {
    nodeDbLoad = createNodeDatabase(resolveSqlitePath()).then((db) => {
      nodeDb = db;
      return db;
    });
  }
  return nodeDbLoad;
}

/**
 * D1-compatible DB used by API routes.
 * - Local Vite / Workers: Cloudflare D1 binding (`env.DB`)
 * - Azure / Node standalone: SQLite file via `node:sqlite`
 */
export function database(): D1Like {
  const testDb = (
    globalThis as { __chombyTestEnv?: { DB?: D1Like } }
  ).__chombyTestEnv?.DB;
  if (testDb) return testDb;

  if (workerEnv?.DB) return workerEnv.DB;

  // Sync callers expect a D1Like immediately. Prefer a sync worker env if the
  // async import already resolved; otherwise expose a thin proxy that awaits
  // resolution on first prepare/bind/run (covers cold first request).
  return createDeferredDatabase();
}

function createDeferredDatabase(): D1Like {
  const resolve = async (): Promise<D1Like> => {
    await loadWorkerEnv();
    if (workerEnv?.DB) return workerEnv.DB;
    return getOrCreateNodeDb();
  };

  const prepare = (sql: string, values: SqlValue[] = []): Prepared => ({
    bind(...nextValues: SqlValue[]) {
      return prepare(sql, nextValues);
    },
    async first<T = Record<string, unknown>>() {
      return (await resolve()).prepare(sql).bind(...values).first<T>();
    },
    async all<T = Record<string, unknown>>() {
      return (await resolve()).prepare(sql).bind(...values).all<T>();
    },
    async run() {
      return (await resolve()).prepare(sql).bind(...values).run();
    },
  });

  return {
    prepare(sql: string) {
      return prepare(sql);
    },
    async batch(statements) {
      return (await resolve()).batch(statements);
    },
  };
}

/** Runtime settings from Workers bindings and/or process.env (Azure App Settings). */
export function settings(): Record<string, string | undefined> {
  const testEnv = (globalThis as { __chombyTestEnv?: Record<string, string> })
    .__chombyTestEnv;
  return {
    ...(workerEnv ?? {}),
    ...(testEnv ?? {}),
    ...process.env,
  } as Record<string, string | undefined>;
}
