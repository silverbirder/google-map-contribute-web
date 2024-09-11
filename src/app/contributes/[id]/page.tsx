"use client";

import { Button } from "~/components/ui/button";
import { AlertCircle, Database } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { api } from "~/trpc/react";
import { ProfileCard } from "~/app/_components/profile-card";
import { SimilarContributorsCard } from "~/app/_components/similar-contributors-card";
import { useEffect } from "react";
import { type BatchStatus, StatusBadge } from "~/lib/batch-status";

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

  const { data: contribBatchStatusData, refetch: refetchContribBatchStatus } =
    api.batchStatus.getLatestBatchStatus.useQuery({
      contributorId: contributorId,
      type: "contrib",
    });

  const {
    data: contribPlaceBatchStatusData,
    refetch: refetchContribPlaceBatchStatus,
  } = api.batchStatus.getLatestBatchStatus.useQuery({
    contributorId: contributorId,
    type: "contrib-place",
  });

  const createBatchJobMutation = api.google.createBatchJob.useMutation();

  const handleUpdateReviews = async () => {
    createBatchJobMutation.mutate({ contributorId, type: "contrib" });
    await refetchContribBatchStatus();
  };

  const handleUpdateSimilarContributors = async () => {
    createBatchJobMutation.mutate({ contributorId, type: "contrib-place" });
    await refetchContribPlaceBatchStatus();
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      void refetchContribBatchStatus();
      void refetchContribPlaceBatchStatus();
    }, 5000);
    return () => clearInterval(intervalId);
  }, [refetchContribBatchStatus, refetchContribPlaceBatchStatus]);

  if (contributorLoading) {
    return (
      <div className="container mx-auto space-y-6 p-4">
        <ProfileCard
          contributor={null}
          isLoading={contributorLoading}
          onUpdateReviews={handleUpdateReviews}
          batchStatus="idle"
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
        batchStatus={contribBatchStatusData?.status?.status}
      />
    );
  }

  const { contributor, similarContributors } = contributorData;
  return (
    <div className="container mx-auto space-y-6 p-4">
      <ProfileCard
        contributor={contributor}
        isLoading={false}
        onUpdateReviews={handleUpdateReviews}
        batchStatus={contribBatchStatusData?.status?.status ?? "idle"}
      />
      <SimilarContributorsCard
        similarContributors={similarContributors}
        isLoading={false}
        onUpdateSimilarContributors={handleUpdateSimilarContributors}
        batchStatus={contribPlaceBatchStatusData?.status?.status ?? "idle"}
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

function NoDataState({
  onFetch,
  batchStatus = "completed",
}: {
  onFetch: () => void;
  batchStatus?: BatchStatus;
}) {
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
          {batchStatus !== "idle" && <StatusBadge batchStatus={batchStatus} />}
        </div>
      </Alert>
    </div>
  );
}
