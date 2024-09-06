"use client";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Skeleton } from "~/components/ui/skeleton";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { api } from "~/trpc/react";

type Props = {
  params: { id: string };
};

export default function Page({ params: { id } }: Props) {
  const contributorId = id;

  // TRPCのAPIからデータを取得
  const { data, isLoading, error } =
    api.contributor.getContributorById.useQuery({
      contributorId: contributorId,
    });

  const handleDataFetch = async () => {
    // データ取得のロジックがここに入ります
  };

  if (isLoading) {
    return <LoadingState />;
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
      <Card>
        <CardHeader>
          <CardTitle>投稿者プロフィール</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage
              src={contributor.profileImageUrl ?? ""}
              alt={contributor.name ?? ""}
            />
            <AvatarFallback>{contributor.name}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{contributor.name}</h2>
            <p className="text-muted-foreground">
              {contributor.reviewCount} レビュー
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>類似の投稿者</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {similarContributors.map((similar) => (
              <div
                key={similar.contributorId}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage
                      src={similar.contributorProfileImageUrl}
                      alt={similar.contributorName}
                    />
                    <AvatarFallback>
                      {similar.contributorName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{similar.contributorName}</p>
                    <p className="text-sm text-muted-foreground">
                      {similar.reviewCount} レビュー
                    </p>
                    <p className="text-sm text-muted-foreground">
                      共通の場所: {similar.placeName}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {similar.commonReviews} 件の共通レビュー
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="container mx-auto space-y-6 p-4">
      <Card>
        <CardHeader>
          <CardTitle>投稿者プロフィール</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center space-x-4">
          <Skeleton className="h-20 w-20 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-24" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>類似の投稿者</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array(3).map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <Skeleton className="h-3 w-24" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
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
  isFetching = false,
}: {
  onFetch: () => void;
  isFetching?: boolean;
}) {
  return (
    <div className="container mx-auto p-4 text-center">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>データが見つかりません</AlertTitle>
        <AlertDescription>
          この投稿者のデータはまだ取得されていません。データを取得しますか？
        </AlertDescription>
      </Alert>
      <Button onClick={onFetch} disabled={isFetching} className="mt-4">
        {isFetching ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            データ取得中...
          </>
        ) : (
          "データを取得する"
        )}
      </Button>
    </div>
  );
}
