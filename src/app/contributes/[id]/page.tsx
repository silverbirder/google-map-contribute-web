"use client";

import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { AlertCircle, Database } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { api } from "~/trpc/react";
import { ProfileCard } from "~/app/_components/profile-card";
import { SimilarContributorsCard } from "~/app/_components/similar-contributors-card";
import { useEffect } from "react";

type Props = {
  params: { id: string };
};

export default function Page({ params: { id } }: Props) {
  const contributorId = id;
  const {
    data: contributorData,
    isLoading: contributorLoading,
    error,
  } = api.contributor.getContributorById.useQuery({
    contributorId: contributorId,
  });

  const { data: batchStatusData, refetch: refetchBatchStatus } =
    api.batchStatus.getLatestBatchStatus.useQuery({
      contributorId: contributorId,
    });

  const createBatchJobMutation = api.google.createBatchJob.useMutation();

  const handleUpdateReviews = async () => {
    createBatchJobMutation.mutate({ contributorId });
    await refetchBatchStatus();
  };

  const handleUpdateSimilarContributors = async () => {
    createBatchJobMutation.mutate({ contributorId });
    await refetchBatchStatus();
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      void refetchBatchStatus();
    }, 5000);
    return () => clearInterval(intervalId);
  }, [refetchBatchStatus]);

  if (contributorLoading) {
    return (
      <div className="container mx-auto space-y-6 p-4">
        <ProfileCard
          contributor={null}
          isLoading={contributorLoading}
          onUpdateReviews={handleUpdateReviews}
        />
        <SimilarContributorsCard
          similarContributors={[]}
          isLoading={contributorLoading}
          onUpdateSimilarContributors={handleUpdateSimilarContributors}
        />
      </div>
    );
  }

  if (error) {
    return <ErrorState error={error.message} />;
  }

  if (!contributorData?.contributor) {
    return (
      <NoDataState
        onFetch={handleUpdateSimilarContributors}
        batchStatus={batchStatusData?.status?.status ?? "idle"}
      />
    );
  }

  const { contributor, similarContributors } = contributorData;
  console.log(batchStatusData?.status?.status ?? "idle");
  return (
    <div className="container mx-auto space-y-6 p-4">
      <ProfileCard
        contributor={contributor}
        isLoading={false}
        onUpdateReviews={handleUpdateReviews}
        batchStatus={batchStatusData?.status?.status ?? "idle"}
      />
      <SimilarContributorsCard
        similarContributors={similarContributors}
        isLoading={false}
        onUpdateSimilarContributors={handleUpdateSimilarContributors}
        batchStatus={batchStatusData?.status?.status ?? "idle"}
      />
    </div>
  );
}

function ErrorState({
  error,
  onRetry,
}: {
  error: string;
  onRetry?: () => void;
}) {
  return (
    <div className="container mx-auto p-4">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>エラー</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
      <Button onClick={onRetry} className="mt-4">
        再試行
      </Button>
    </div>
  );
}

type BatchStatus = "idle" | "waiting" | "in_progress" | "completed" | "error";

function NoDataState({
  onFetch,
  batchStatus = "completed",
}: {
  onFetch: () => void;
  batchStatus?: BatchStatus;
}) {
  const getBatchStatusText = (status: BatchStatus) => {
    switch (status) {
      case "waiting":
        return "待機中";
      case "in_progress":
        return "クローリング中";
      case "completed":
        return "完了";
      case "error":
        return "エラー";
      default:
        return "";
    }
  };

  const getBatchStatusColor = (status: BatchStatus) => {
    switch (status) {
      case "waiting":
        return "bg-yellow-500";
      case "in_progress":
        return "bg-blue-500";
      case "completed":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Alert className="flex flex-col items-center">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>データが見つかりません</AlertTitle>
        <AlertDescription>
          この投稿者のデータはまだありません。データを収集しますか？
        </AlertDescription>
        <div className="mt-6 flex flex-col items-center space-y-2">
          <Button
            onClick={onFetch}
            disabled={["waiting", "in_progress", "error"].includes(batchStatus)}
            className="w-full sm:w-auto"
          >
            <Database className="mr-2 h-4 w-4" />
            データ収集開始
          </Button>
          {batchStatus !== "idle" && (
            <Badge
              className={`${getBatchStatusColor(batchStatus)} text-center`}
            >
              {getBatchStatusText(batchStatus)}
            </Badge>
          )}
        </div>
      </Alert>
    </div>
  );
}
