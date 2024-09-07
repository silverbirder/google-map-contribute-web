"use client";

import { Button } from "~/components/ui/button";
import { AlertCircle } from "lucide-react";
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

  const handleDataFetch = async () => {
    // データ取得ロジック
  };

  if (isLoading) {
    return (
      <div className="container mx-auto space-y-6 p-4">
        <ProfileCard contributor={null} isLoading={isLoading} />
        <SimilarContributorsCard
          similarContributors={[]}
          isLoading={isLoading}
        />
      </div>
    );
  }

  if (error) {
    return <ErrorState error={error.message} />;
  }

  if (!data?.contributor) {
    return <NoDataState onFetch={handleDataFetch} />;
  }

  const { contributor, similarContributors } = data;

  return (
    <div className="container mx-auto space-y-6 p-4">
      <ProfileCard contributor={contributor} isLoading={false} />
      <SimilarContributorsCard
        similarContributors={similarContributors}
        isLoading={false}
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
