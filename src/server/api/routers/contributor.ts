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
            -- gmcrテーブルでこの投稿者が行った全体のレビュー数を計算
            (SELECT COUNT(*) FROM ${review} r WHERE r.contributor_id = gmcc.id) as "reviewCount",
            -- 共通の場所のレビュー数を計算
            b.place_name as "placeName",
            b.common_reviews as "commonReviews"
          FROM
            ${contributor} gmcc
          LEFT JOIN (
            SELECT
              gmcr.contributor_id,
              string_agg(DISTINCT gmp.name, ', ') as place_name,
              COUNT(DISTINCT gmcr.place_id) as common_reviews
            FROM
              ${review} gmcr
            JOIN ${place} gmp ON gmcr.place_id = gmp.id
            WHERE
              gmcr.place_id IN (
                SELECT
                  r.place_id
                FROM
                  ${review} r
                JOIN ${contributor} c ON c.id = r.contributor_id
                WHERE
                  c."contributorId" = ${input.contributorId}
                GROUP BY
                  r.place_id
              )
            GROUP BY
              gmcr.contributor_id
          ) b ON gmcc.id = b.contributor_id
          WHERE
            COALESCE(b.common_reviews, 0) >= 3
          ORDER BY
            b.common_reviews DESC;
        `,
      );

      const similarContributors = similarContributorsData as unknown as {
        id: number;
        contributorId: string;
        contributorName: string;
        contributorProfileImageUrl: string;
        contributorUrl: string;
        reviewCount: number;
        placeName: string;
        commonReviews: number;
      }[];
      const filterdSimilarContributors = similarContributors.filter(
        (contributor) => contributor.id !== (contributorData[0]?.id ?? ""),
      );
      return {
        contributor: contributorData[0],
        similarContributors: filterdSimilarContributors,
      };
    }),
});
