import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Database } from "lucide-react";
import { SimilarContributorCard } from "./similar-contributor-card";

type SimilarContributor = {
  id: number;
  contributorId: string;
  contributorName: string;
  contributorProfileImageUrl: string;
  contributorUrl: string;
  reviewCount: number;
  commonReviews: number;
};

type BatchStatus = "idle" | "waiting" | "in_progress" | "completed" | "error";

type Props = {
  similarContributors: SimilarContributor[];
  isLoading: boolean;
  onUpdateSimilarContributors: () => void;
  batchStatus?: BatchStatus;
  isUpdating?: boolean;
};

export function SimilarContributorsCard({
  similarContributors,
  isLoading,
  onUpdateSimilarContributors,
  batchStatus = "idle",
}: Props) {
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
            Array(3)
              .fill(null)
              .map((_, index) => (
                <SimilarContributorCard key={index} isLoading={isLoading} />
              ))
          ) : similarContributors.length > 0 ? (
            // データが存在する場合、類似の投稿者を表示
            similarContributors.map((similar) => (
              <SimilarContributorCard
                key={similar.id}
                similar={similar}
                isLoading={isLoading}
              />
            ))
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
