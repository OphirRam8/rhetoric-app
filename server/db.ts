import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { eq } from "drizzle-orm";
import { users, progress } from "../drizzle/schema";

let db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (db) return db;
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL is not set");
    return null;
  }
  const pool = mysql.createPool({ uri: url });
  db = drizzle(pool);
  return db;
}

export async function getUserByEmail(email: string) {
  const d = await getDb();
  if (!d) return null;
  const [user] = await d.select().from(users).where(eq(users.email, email)).limit(1);
  return user || null;
}

export async function getUserById(id: string) {
  const d = await getDb();
  if (!d) return null;
  const [user] = await d.select().from(users).where(eq(users.id, id)).limit(1);
  return user || null;
}

export async function createUser(data: { email: string; name: string; passwordHash: string }) {
  const d = await getDb();
  if (!d) throw new Error("Database not available");
  const id = crypto.randomUUID();
  await d.insert(users).values({ id, ...data });
  return { id, email: data.email, name: data.name };
}

export async function getProgress(userId: string) {
  const d = await getDb();
  if (!d) return null;
  const [row] = await d.select().from(progress).where(eq(progress.userId, userId)).limit(1);
  return row?.data || null;
}

export async function saveProgress(userId: string, data: unknown) {
  const d = await getDb();
  if (!d) throw new Error("Database not available");
  await d.insert(progress).values({ userId, data })
    .onDuplicateKeyUpdate({ set: { data } });
}
