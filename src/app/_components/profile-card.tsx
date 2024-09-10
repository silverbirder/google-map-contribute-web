import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Skeleton } from "~/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { MapPin, Database } from "lucide-react";
import Link from "next/link";
import { type BatchStatus, StatusBadge } from "~/lib/batch-status";

type Contributor = {
  id: number;
  contributorId: string | null;
  name: string | null;
  url: string | null;
  profileImageUrl: string | null;
  reviewCount: number | null;
  createdAt: Date | null;
  updatedAt: Date | null;
};

type Props = {
  contributor: Contributor | null;
  isLoading: boolean;
  onUpdateReviews: () => void;
  batchStatus: BatchStatus;
};

export function ProfileCard({
  contributor,
  isLoading,
  onUpdateReviews,
  batchStatus,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>投稿者プロフィール</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0">
          {isLoading ? (
            <Skeleton className="h-20 w-20 rounded-full" />
          ) : (
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={contributor?.profileImageUrl ?? ""}
                alt={contributor?.name ?? ""}
              />
              <AvatarFallback>{contributor?.name}</AvatarFallback>
            </Avatar>
          )}
          <div className="flex-grow text-center sm:text-left">
            {isLoading ? (
              <Skeleton className="mx-auto h-6 w-40 sm:mx-0" />
            ) : (
              <h2 className="text-xl font-bold sm:text-2xl">
                {contributor?.name}
              </h2>
            )}
            {isLoading ? (
              <Skeleton className="mx-auto mt-1 h-4 w-24 sm:mx-0" />
            ) : (
              <p className="text-muted-foreground">
                {`${contributor?.reviewCount ?? 0} レビュー`}
              </p>
            )}
            <div className="mt-2 flex justify-center space-x-2 sm:justify-start">
              {isLoading ? (
                <Skeleton className="h-4 w-4" />
              ) : (
                <Link
                  href={`https://www.google.com/maps/contrib/${contributor?.contributorId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-sm text-blue-600"
                >
                  <MapPin className="h-4 w-4" />
                  <span>Google Map</span>
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-col items-center justify-center space-y-2 sm:flex-row sm:justify-end sm:space-x-2 sm:space-y-0">
          <Button
            onClick={onUpdateReviews}
            disabled={
              isLoading ||
              ["waiting", "in_progress", "error"].includes(batchStatus)
            }
            size="sm"
          >
            <Database className="mr-2 h-4 w-4" />
            データ収集開始
          </Button>
          {batchStatus !== "idle" && <StatusBadge batchStatus={batchStatus} />}
        </div>
      </CardContent>
    </Card>
  );
}
