import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
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

type Props = {
  similarContributors: SimilarContributor[];
  isLoading: boolean;
};

export function SimilarContributorsCard({
  similarContributors,
  isLoading,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>類似の投稿者</CardTitle>
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
            <p className="text-muted-foreground">
              類似の投稿者が見つかりませんでした。
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
