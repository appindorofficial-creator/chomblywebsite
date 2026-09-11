import { database } from "./raw";
import * as schema from "./schema";

/**
 * App routes use `database()` from `db/raw` (D1-compatible SQLite on Node/Azure).
 * This helper remains for example code that previously used Drizzle+D1.
 */
export function getDb() {
  void schema;
  return database();
}
