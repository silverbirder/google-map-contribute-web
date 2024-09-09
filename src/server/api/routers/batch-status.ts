import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { batchStatus } from "~/server/db/schema";
import { eq, desc } from "drizzle-orm";

export const batchStatusRouter = createTRPCRouter({
  getLatestBatchStatus: publicProcedure
    .input(z.object({ contributorId: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const latestBatchStatus = await ctx.db
        .select({
          id: batchStatus.id,
          contributorId: batchStatus.contributorId,
          status: batchStatus.status,
          createdAt: batchStatus.createdAt,
        })
        .from(batchStatus)
        .where(eq(batchStatus.contributorId, input.contributorId))
        .orderBy(desc(batchStatus.createdAt))
        .limit(1);

      if (latestBatchStatus.length === 0) {
        return { status: null };
      }

      return { status: latestBatchStatus[0] };
    }),
});
