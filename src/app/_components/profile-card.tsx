import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Skeleton } from "~/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { MapPin } from "lucide-react";
import Link from "next/link";

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
};

export function ProfileCard({ contributor, isLoading }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>投稿者プロフィール</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center space-x-4">
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
        <div>
          {isLoading ? (
            <Skeleton className="h-6 w-40" />
          ) : (
            <h2 className="text-2xl font-bold">{contributor?.name}</h2>
          )}
          {isLoading ? (
            <Skeleton className="mt-1 h-4 w-24" />
          ) : (
            <p className="text-muted-foreground">
              {`${contributor?.reviewCount ?? 0} レビュー`}
            </p>
          )}
          <div className="mt-1 flex flex-wrap space-x-2">
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
              </Link>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
