import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { contributor, place, review } from "~/server/db/schema";
import { eq, sql } from "drizzle-orm";

export const contributorRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getContributorById: publicProcedure
    .input(z.object({ contributorId: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      // コントリビュータデータを取得
      const contributorData = await ctx.db
        .select({
          id: contributor.id,
          name: contributor.name,
          url: contributor.url,
          profileImageUrl: contributor.profileImageUrl,
          contributorId: contributor.contributorId,
          createdAt: contributor.createdAt,
          updatedAt: contributor.updatedAt,
          reviewCount: sql<number>`COUNT(${review.id})`.as("reviewCount"),
        })
        .from(contributor)
        .leftJoin(review, eq(review.contributorId, contributor.id))
        .where(eq(contributor.contributorId, input.contributorId))
        .groupBy(contributor.id)
        .limit(1);

      if (contributorData.length === 0) {
        return { contributor: null, similarContributors: [] };
      }

      // 類似の投稿者を見つける生SQLクエリ
      const similarContributorsData = await ctx.db.execute(
        sql`
          SELECT
            gmcc.id as "id",
            gmcc.name as "contributorName",
            gmcc.url as "contributorUrl",
            gmcc."contributorId" as "contributorId",
            gmcc."profileImageUrl" as "contributorProfileImageUrl",
            json_agg(json_build_object(
              'id', gmp.id,
              'name', gmp.name,
              'profileImageUrl', gmp."profileImageUrl",
              'url', gmp.url
            )) as "commonReviews"
          FROM
            ${contributor} gmcc
          INNER JOIN ${review} gmcr ON gmcc.id = gmcr.contributor_id
          INNER JOIN ${place} gmp ON gmcr.place_id = gmp.id
          WHERE
            gmcc."contributorId" <> ${input.contributorId}
            AND EXISTS (
              SELECT 1
              FROM ${review} r
              INNER JOIN ${contributor} c ON c.id = r.contributor_id
              WHERE c."contributorId" = ${input.contributorId}
              AND r.place_id = gmcr.place_id
            )
          GROUP BY
            gmcc.id
          ORDER BY
            COUNT(gmcc.id) DESC;
        `,
      );

      const similarContributors = similarContributorsData as unknown as {
        id: number;
        contributorId: string;
        contributorName: string;
        contributorProfileImageUrl: string;
        contributorUrl: string;
        commonReviews: Array<{
          id: number;
          name: string;
          profileImageUrl: string;
          url: string;
        }>;
      }[];

      const filteredSimilarContributors = similarContributors.filter(
        (contributor) => contributor.id !== (contributorData[0]?.id ?? ""),
      );

      return {
        contributor: contributorData[0],
        similarContributors: filteredSimilarContributors,
      };
    }),
});
