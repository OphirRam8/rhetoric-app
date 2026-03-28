import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { eq } from "drizzle-orm";
import { users, progress } from "../drizzle/schema";
import path from "path";
import fs from "fs";

let db: ReturnType<typeof drizzle> | null = null;

export function getDb() {
  if (db) return db;
  const dbPath = process.env.DATABASE_URL || path.resolve(import.meta.dirname, "..", "data", "rhetoric.db");
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const sqlite = new Database(dbPath);
  sqlite.pragma("journal_mode = WAL");
  sqlite.pragma("foreign_keys = ON");
  db = drizzle(sqlite);

  // Auto-create tables if they don't exist
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      passwordHash TEXT NOT NULL,
      createdAt INTEGER DEFAULT (unixepoch())
    );
    CREATE TABLE IF NOT EXISTS progress (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      data TEXT NOT NULL,
      updatedAt INTEGER DEFAULT (unixepoch())
    );
    CREATE UNIQUE INDEX IF NOT EXISTS progress_user_idx ON progress(userId);
  `);

  return db;
}

export function getUserByEmail(email: string) {
  const d = getDb();
  const rows = d.select().from(users).where(eq(users.email, email)).limit(1).all();
  return rows[0] || null;
}

export function getUserById(id: string) {
  const d = getDb();
  const rows = d.select().from(users).where(eq(users.id, id)).limit(1).all();
  return rows[0] || null;
}

export function createUser(data: { email: string; name: string; passwordHash: string }) {
  const d = getDb();
  const id = crypto.randomUUID();
  d.insert(users).values({ id, ...data }).run();
  return { id, email: data.email, name: data.name };
}

export function getProgress(userId: string) {
  const d = getDb();
  const rows = d.select().from(progress).where(eq(progress.userId, userId)).limit(1).all();
  return rows[0]?.data || null;
}

export function saveProgress(userId: string, data: unknown) {
  const d = getDb();
  const existing = d.select().from(progress).where(eq(progress.userId, userId)).limit(1).all();
  if (existing.length > 0) {
    d.update(progress).set({ data: data as any, updatedAt: new Date() }).where(eq(progress.userId, userId)).run();
  } else {
    d.insert(progress).values({ userId, data: data as any }).run();
  }
}
