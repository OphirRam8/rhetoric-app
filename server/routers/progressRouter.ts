import { z } from "zod";
import { router, protectedProcedure } from "../trpc";
import { getProgress, saveProgress } from "../db";

export const progressRouter = router({
  load: protectedProcedure.query(({ ctx }) => {
    return getProgress(ctx.user.id);
  }),

  save: protectedProcedure
    .input(z.object({
      data: z.object({
        flashcardsStudied: z.record(z.any()).optional(),
        quizScores: z.record(z.any()).optional(),
        scenariosCompleted: z.record(z.any()).optional(),
        chaptersRead: z.record(z.any()).optional(),
      }),
    }))
    .mutation(({ ctx, input }) => {
      saveProgress(ctx.user.id, input.data);
      return { success: true };
    }),
});
