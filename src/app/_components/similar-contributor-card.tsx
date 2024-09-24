import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Skeleton } from "~/components/ui/skeleton";
import { MapPin, ArrowRight, Star, ExternalLink } from "lucide-react";
import Link from "next/link";

type SimilarContributor = {
  id: number;
  contributorId: string;
  contributorName: string;
  contributorProfileImageUrl: string;
  contributorUrl: string;
  reviewCount: number;
  commonReviews: Array<{
    id: number;
    name: string;
    profileImageUrl: string;
    url: string;
  }>;
};

type Props = {
  similar?: SimilarContributor;
  isLoading: boolean;
};

export function SimilarContributorCard({ similar, isLoading }: Props) {
  return (
    <div className="flex flex-col space-y-3 sm:space-y-4">
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
                {`${similar?.reviewCount ?? 0} 件のクチコミ`}
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
                {similar?.commonReviews.length ?? 0} 件の共通クチコミ
              </span>
            </>
          )}
        </div>
      </div>
      <div className="mt-2">
        <p className="mb-2 text-sm font-medium text-gray-600">共通の場所：</p>
        <div className="flex flex-wrap gap-2">
          {isLoading
            ? Array(3)
                .fill(0)
                .map((_, index) => (
                  <Skeleton key={index} className="h-8 w-24" />
                ))
            : similar?.commonReviews.map((place) => (
                <a
                  key={place.id}
                  href={place.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 rounded-md border border-gray-200 bg-white p-1 shadow-sm transition-colors duration-200 hover:bg-gray-50"
                >
                  <img
                    src={place.profileImageUrl}
                    alt={`${place.name} logo`}
                    width={24}
                    height={24}
                    className="rounded-sm"
                  />
                  <span className="text-xs">{place.name}</span>
                  <ExternalLink className="h-3 w-3 text-gray-400" />
                </a>
              ))}
        </div>
      </div>
    </div>
  );
}
