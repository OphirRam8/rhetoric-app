import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { User } from "../drizzle/schema";
import { verifySessionToken } from "./auth";
import { getUserById } from "./db";
import { COOKIE_NAME } from "../shared/const";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User | null;
};

export async function createContext(opts: CreateExpressContextOptions): Promise<TrpcContext> {
  const token = opts.req.cookies[COOKIE_NAME];
  if (!token) {
    return { req: opts.req, res: opts.res, user: null };
  }

  const payload = await verifySessionToken(token);
  if (!payload) {
    return { req: opts.req, res: opts.res, user: null };
  }

  const user = await getUserById(payload.userId);
  return { req: opts.req, res: opts.res, user: user || null };
}
