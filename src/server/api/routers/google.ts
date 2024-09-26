import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { batchStatus } from "~/server/db/schema";
import { desc, eq, and } from "drizzle-orm";
import { v2 } from "@google-cloud/run";
import { db } from "~/server/db";

const { JobsClient } = v2;
const runClient = new JobsClient({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  credentials: {
    client_email: process.env.GOOGLE_CLOUD_CREDENTIALS_CLIENT_EMAIL,
    private_key: (
      process.env.GOOGLE_CLOUD_CREDENTIALS_PRIVATE_KEY ?? ""
    ).replace(/\\n/g, "\n"),
  },
});

export const googleRouter = createTRPCRouter({
  createBatchJob: publicProcedure
    .input(
      z.object({
        contributorId: z.string().min(1),
        startUrls: z.string().min(1),
        type: z.enum(["contrib", "contrib-place", "place", "place-contrib"]),
      }),
    )
    .mutation(async ({ input }) => {
      const { contributorId, startUrls, type } = input;

      // ステータスが waiting または in_progress でないことを確認
      const existingBatchStatus = await db
        .select()
        .from(batchStatus)
        .where(
          and(
            eq(batchStatus.contributorId, contributorId),
            eq(batchStatus.type, type),
          ),
        )
        .orderBy(desc(batchStatus.createdAt))
        .limit(1);

      const currentStatus = existingBatchStatus[0]?.status;

      if (currentStatus === "waiting" || currentStatus === "in_progress") {
        return {
          success: true,
          message: "Batch is already in progress or waiting.",
        };
      }

      await db.insert(batchStatus).values({
        contributorId,
        type,
        status: "waiting",
        createdAt: new Date(),
      });

      if (process.env.NODE_ENV === "development") {
        // 開発環境では擬似的にステータスを更新
        await sleep(5000);
        await db.insert(batchStatus).values({
          contributorId,
          type,
          status: "in_progress",
          createdAt: new Date(),
        });
        await sleep(5000);
        await db.insert(batchStatus).values({
          contributorId,
          type,
          status: "completed",
          createdAt: new Date(),
        });
        return {
          success: true,
          message: "Batch job simulated in development mode.",
        };
      }

      // 本番環境ではCloud Run Job を実行
      await runClient.runJob({
        name: process.env.GOOGLE_CLOUD_RUN_JOB_NAME,
        overrides: {
          containerOverrides: [
            {
              env: [
                {
                  name: "START_URLS",
                  value: startUrls,
                },
                {
                  name: "TYPE",
                  value: type,
                },
              ],
            },
          ],
        },
      });

      return { success: true, message: "Batch job started." };
    }),
});

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));
