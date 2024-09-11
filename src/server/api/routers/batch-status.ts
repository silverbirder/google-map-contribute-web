import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { batchStatus } from "~/server/db/schema";
import { eq, desc, and } from "drizzle-orm";

export const batchStatusRouter = createTRPCRouter({
  getLatestBatchStatus: publicProcedure
    .input(
      z.object({
        contributorId: z.string().min(1),
        type: z.enum(["contrib", "contrib-place", "place", "place-contrib"]),
      }),
    )
    .query(async ({ ctx, input }) => {
      const latestBatchStatus = await ctx.db
        .select({
          id: batchStatus.id,
          contributorId: batchStatus.contributorId,
          status: batchStatus.status,
          createdAt: batchStatus.createdAt,
        })
        .from(batchStatus)
        .where(
          and(
            eq(batchStatus.contributorId, input.contributorId),
            eq(batchStatus.type, input.type),
          ),
        )
        .orderBy(desc(batchStatus.createdAt))
        .limit(1);

      if (latestBatchStatus.length === 0) {
        return { status: null };
      }

      return { status: latestBatchStatus[0] };
    }),
});
