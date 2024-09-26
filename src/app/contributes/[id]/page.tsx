"use client";

import { Button } from "~/components/ui/button";
import { AlertCircle, Database } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { api } from "~/trpc/react";
import { ProfileCard } from "~/app/_components/profile-card";
import { SimilarContributorsCard } from "~/app/_components/similar-contributors-card";
import { useEffect, useState } from "react";
import { type BatchStatus, StatusBadge } from "~/lib/batch-status";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogFooter,
} from "~/components/ui/alert-dialog";

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
    createBatchJobMutation.mutate({
      contributorId,
      type: "contrib",
      startUrls: `https://www.google.com/maps/contrib/${contributorId}/reviews`,
    });
    await refetchContribBatchStatus();
  };

  const handleUpdateSimilarContributors = async () => {
    createBatchJobMutation.mutate({
      contributorId,
      type: "contrib-place",
      startUrls: `https://www.google.com/maps/contrib/${contributorId}/reviews`,
    });
    await refetchContribPlaceBatchStatus();
  };

  const handleSaveUrls = async (urls: string[]) => {
    createBatchJobMutation.mutate({
      contributorId,
      type: "contrib-place",
      startUrls: urls.join(","),
    });
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
          contributorId={contributorId}
          isLoading={contributorLoading}
          onUpdateReviews={handleUpdateReviews}
          batchStatus="idle"
          placeBatchStatus="idle"
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
        onFetch={handleUpdateReviews}
        batchStatus={contribBatchStatusData?.status?.status}
      />
    );
  }

  const { contributor, similarContributors } = contributorData;
  return (
    <div className="container mx-auto space-y-6 p-4">
      <ProfileCard
        contributor={contributor}
        contributorId={contributorId}
        isLoading={false}
        onUpdateReviews={handleUpdateReviews}
        onSaveUrls={handleSaveUrls}
        batchStatus={contribBatchStatusData?.status?.status ?? "idle"}
        placeBatchStatus={contribPlaceBatchStatusData?.status?.status ?? "idle"}
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
  batchStatus = "idle",
}: {
  onFetch: () => void;
  batchStatus?: BatchStatus;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleConfirmUpdate = () => {
    setIsDialogOpen(false);
    onFetch();
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
          <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button
                disabled={["waiting", "in_progress", "error"].includes(
                  batchStatus,
                )}
                className="w-full sm:w-auto"
              >
                <Database className="mr-2 h-4 w-4" />
                データ収集開始
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>データ収集の確認</AlertDialogTitle>
                <AlertDialogDescription>
                  データ収集を開始しますか？
                  <br />
                  1件のクチコミにつき約1分かかります。クチコミの件数に応じて処理時間が変わりますので、ご了承ください。
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>キャンセル</AlertDialogCancel>
                <AlertDialogAction onClick={handleConfirmUpdate}>
                  開始
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          {batchStatus !== "idle" && <StatusBadge batchStatus={batchStatus} />}
        </div>
      </Alert>
    </div>
  );
}
