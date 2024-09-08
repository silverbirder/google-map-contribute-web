"use client";

import { Button } from "~/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { api } from "~/trpc/react";
import { ProfileCard } from "~/app/_components/profile-card";
import { SimilarContributorsCard } from "~/app/_components/similar-contributors-card";
import { useState } from "react";

type Props = {
  params: { id: string };
};

export default function Page({ params: { id } }: Props) {
  const contributorId = id;
  const [isUpdatingReviews, setIsUpdatingReviews] = useState(false);
  const [isUpdatingSimilarContributors, setIsUpdatingSimilarContributors] =
    useState(false);

  const { data, isLoading, error, refetch } =
    api.contributor.getContributorById.useQuery({
      contributorId: contributorId,
    });

  const handleUpdateReviews = async () => {
    setIsUpdatingReviews(true);
    await refetch();
    setIsUpdatingReviews(false);
  };

  const handleUpdateSimilarContributors = async () => {
    setIsUpdatingSimilarContributors(true);
    await refetch();
    setIsUpdatingSimilarContributors(false);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto space-y-6 p-4">
        <ProfileCard
          contributor={null}
          isLoading={isLoading}
          onUpdateReviews={handleUpdateReviews}
          isUpdating={isUpdatingReviews}
        />
        <SimilarContributorsCard
          similarContributors={[]}
          isLoading={isLoading}
          onUpdateSimilarContributors={handleUpdateSimilarContributors}
          isUpdating={isUpdatingSimilarContributors}
        />
      </div>
    );
  }

  if (error) {
    return <ErrorState error={error.message} />;
  }

  if (!data?.contributor) {
    return <NoDataState onFetch={refetch} />;
  }

  const { contributor, similarContributors } = data;

  return (
    <div className="container mx-auto space-y-6 p-4">
      <ProfileCard
        contributor={contributor}
        isLoading={false}
        onUpdateReviews={handleUpdateReviews}
        isUpdating={isUpdatingReviews}
      />
      <SimilarContributorsCard
        similarContributors={similarContributors}
        isLoading={false}
        onUpdateSimilarContributors={handleUpdateSimilarContributors}
        isUpdating={isUpdatingSimilarContributors}
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
          この投稿者のデータはまだ取得されていません。データを取得しますか？
        </AlertDescription>
      </Alert>
      <Button onClick={onFetch} className="mt-4">
        データを取得する
      </Button>
    </div>
  );
}
