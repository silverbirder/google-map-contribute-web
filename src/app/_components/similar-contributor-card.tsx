import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Skeleton } from "~/components/ui/skeleton";
import { MapPin, ArrowRight, Star } from "lucide-react";
import Link from "next/link";

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
  similar?: SimilarContributor;
  isLoading: boolean;
};

export function SimilarContributorCard({ similar, isLoading }: Props) {
  return (
    <div className="flex flex-col space-y-3 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex items-start space-x-3">
        {isLoading ? (
          <Skeleton className="h-10 w-10 rounded-full" />
        ) : (
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={similar?.contributorProfileImageUrl ?? ""}
              alt={similar?.contributorName ?? ""}
            />
            <AvatarFallback>{similar?.contributorName?.[0]}</AvatarFallback>
          </Avatar>
        )}
        <div className="min-h-[60px]">
          {isLoading ? (
            <Skeleton className="h-4 w-32" />
          ) : (
            <p className="font-medium">{similar?.contributorName}</p>
          )}
          {isLoading ? (
            <Skeleton className="mt-1 h-3 w-24" />
          ) : (
            <p className="text-sm text-muted-foreground">
              {`${similar?.reviewCount ?? 0} レビュー`}
            </p>
          )}
          <div className="mt-1 flex flex-wrap space-x-2">
            {isLoading ? (
              <>
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-24" />
              </>
            ) : (
              <>
                <Link
                  href={`https://www.google.com/maps/contrib/${similar?.contributorId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-sm text-blue-600"
                >
                  <MapPin className="h-4 w-4" />
                </Link>
                <Link
                  href={`/contributes/${similar?.contributorId}`}
                  className="flex items-center space-x-1 text-sm text-blue-600"
                >
                  <ArrowRight className="h-4 w-4" /> 投稿者ページ
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2 text-sm text-muted-foreground sm:mt-0">
        {isLoading ? (
          <>
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-24" />
          </>
        ) : (
          <>
            <Star className="h-4 w-4 text-yellow-500" />
            <span className="font-semibold text-yellow-600">
              {similar?.commonReviews ?? 0} 件の共通レビュー
            </span>
          </>
        )}
      </div>
    </div>
  );
}
