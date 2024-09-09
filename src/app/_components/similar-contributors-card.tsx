import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { ChevronDown, Database } from "lucide-react";
import { SimilarContributorCard } from "./similar-contributor-card";
import {
  type BatchStatus,
  getBatchStatusColor,
  getBatchStatusText,
} from "~/lib/batch-status";
import { useState } from "react";

type SimilarContributor = {
  id: number;
  contributorId: string;
  contributorName: string;
  contributorProfileImageUrl: string;
  contributorUrl: string;
  reviewCount: number;
  commonReviews: number;
};

type Props = {
  similarContributors: SimilarContributor[];
  isLoading: boolean;
  onUpdateSimilarContributors: () => void;
  batchStatus?: BatchStatus;
};

export function SimilarContributorsCard({
  similarContributors,
  isLoading,
  onUpdateSimilarContributors,
  batchStatus = "idle",
}: Props) {
  const [visibleCount, setVisibleCount] = useState(5);

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };

  const visibleContributors = similarContributors.slice(0, visibleCount);
  const hasMore = visibleCount < similarContributors.length;

  return (
    <Card>
      <CardHeader className="flex flex-col items-center justify-between space-y-2 sm:flex-row sm:space-y-0">
        <CardTitle className="text-center sm:text-left">類似の投稿者</CardTitle>
        <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
          <Button
            onClick={onUpdateSimilarContributors}
            disabled={
              isLoading ||
              ["waiting", "in_progress", "error"].includes(batchStatus)
            }
            size="sm"
            variant="outline"
          >
            <Database className="mr-2 h-4 w-4" />
            データ収集開始
          </Button>
          {batchStatus !== "idle" && (
            <Badge
              className={`${getBatchStatusColor(batchStatus)} text-center sm:w-auto`}
            >
              {getBatchStatusText(batchStatus)}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading ? (
            // ローディング中はスケルトンを表示
            Array(5)
              .fill(null)
              .map((_, index) => (
                <SimilarContributorCard key={index} isLoading={isLoading} />
              ))
          ) : visibleContributors.length > 0 ? (
            <>
              {visibleContributors.map((similar) => (
                <SimilarContributorCard
                  key={similar.id}
                  similar={similar}
                  isLoading={isLoading}
                />
              ))}
              {hasMore && (
                <div className="mt-4 flex justify-center">
                  <Button onClick={loadMore} variant="outline" size="sm">
                    <ChevronDown className="mr-2 h-4 w-4" />
                    もっと見る
                  </Button>
                </div>
              )}
            </>
          ) : (
            <p className="text-center text-muted-foreground sm:text-left">
              類似の投稿者が見つかりませんでした。
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
