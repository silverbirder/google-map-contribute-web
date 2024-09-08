"use client";

import { Button } from "~/components/ui/button";
import { AlertCircle, Database } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { api } from "~/trpc/react";
import { ProfileCard } from "~/app/_components/profile-card";
import { SimilarContributorsCard } from "~/app/_components/similar-contributors-card";

type Props = {
  params: { id: string };
};

export default function Page({ params: { id } }: Props) {
  const contributorId = id;
  const { data, isLoading, error } =
    api.contributor.getContributorById.useQuery({
      contributorId: contributorId,
    });
  const createBatchJobMutation = api.google.createBatchJob.useMutation();

  const handleUpdateReviews = async () => {
    createBatchJobMutation.mutate({ contributorId });
  };

  const handleUpdateSimilarContributors = async () => {
    createBatchJobMutation.mutate({ contributorId });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto space-y-6 p-4">
        <ProfileCard
          contributor={null}
          isLoading={isLoading}
          onUpdateReviews={handleUpdateReviews}
        />
        <SimilarContributorsCard
          similarContributors={[]}
          isLoading={isLoading}
          onUpdateSimilarContributors={handleUpdateSimilarContributors}
        />
      </div>
    );
  }

  if (error) {
    return <ErrorState error={error.message} />;
  }

  if (!data?.contributor) {
    return <NoDataState onFetch={handleUpdateSimilarContributors} />;
  }

  const { contributor, similarContributors } = data;

  return (
    <div className="container mx-auto space-y-6 p-4">
      <ProfileCard
        contributor={contributor}
        isLoading={false}
        onUpdateReviews={handleUpdateReviews}
      />
      <SimilarContributorsCard
        similarContributors={similarContributors}
        isLoading={false}
        onUpdateSimilarContributors={handleUpdateSimilarContributors}
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

function NoDataState({ onFetch }: { onFetch: () => void }) {
  return (
    <div className="container mx-auto p-4 text-center">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>データが見つかりません</AlertTitle>
        <AlertDescription>
          この投稿者のデータはまだありません。データを収集しますか？
        </AlertDescription>
      </Alert>
      <Button onClick={onFetch} className="sm mt-4">
        <Database className="mr-2 h-4 w-4" />
        データ収集開始
      </Button>
    </div>
  );
}
