import { router } from "../trpc";
import { authRouter } from "./authRouter";
import { progressRouter } from "./progressRouter";

export const appRouter = router({
  auth: authRouter,
  progress: progressRouter,
});

export type AppRouter = typeof appRouter;
