"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Skeleton } from "~/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  MapPin,
  Database,
  Plus,
  Save,
  AlertCircle,
  Link as LinkIcon,
  Search,
} from "lucide-react";
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
  contributorId: string;
  isLoading: boolean;
  onUpdateReviews: () => void;
  onSaveUrls?: (urls: string[]) => void;
  batchStatus: BatchStatus;
  placeBatchStatus: BatchStatus;
};

export function ProfileCard({
  contributor,
  contributorId,
  isLoading,
  onUpdateReviews,
  onSaveUrls,
  batchStatus,
  placeBatchStatus,
}: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUrlModalOpen, setIsUrlModalOpen] = useState(false);
  const [urls, setUrls] = useState<string[]>([""]);
  const [urlErrors, setUrlErrors] = useState<string[]>([]);

  const handleConfirmUpdate = () => {
    setIsDialogOpen(false);
    onUpdateReviews();
  };

  const handleAddUrl = () => {
    setUrls([...urls, ""]);
    setUrlErrors([...urlErrors, ""]);
  };

  const handleUrlChange = (index: number, value: string) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);

    const newErrors = [...urlErrors];
    newErrors[index] = validateUrl(value);
    setUrlErrors(newErrors);
  };

  const validateUrl = (url: string): string => {
    const regex = /^https:\/\/www\.google\.com\/maps\/contrib\/\d+\/place\/.+$/;
    return url.trim() !== "" && !regex.test(url)
      ? "URLの形式が正しくありません"
      : "";
  };

  const handleSaveUrls = () => {
    const validUrls = urls.filter(
      (url) => url.trim() !== "" && validateUrl(url) === "",
    );
    onSaveUrls?.(validUrls);
    setUrls([""]);
    setUrlErrors([""]);
    setIsUrlModalOpen(false);
  };

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
                {`${contributor?.reviewCount ?? 0} 件のクチコミ`}
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
        <div className="mt-4 flex flex-col items-center space-y-2 sm:flex-row sm:justify-end sm:space-x-2 sm:space-y-0">
          <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button
                disabled={
                  isLoading ||
                  ["waiting", "in_progress", "error"].includes(batchStatus)
                }
                size="sm"
                className="w-full sm:w-auto"
              >
                <Database className="mr-2 h-4 w-4" />
                データ収集開始
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>データ収集の確認</AlertDialogTitle>
                <AlertDialogDescription>
                  データ収集を開始しますか？
                  <br />
                  1件のクチコミにつき約1分かかります。クチコミの件数に応じて処理時間が変わりますので、ご了承ください。
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>キャンセル</AlertDialogCancel>
                <AlertDialogAction onClick={handleConfirmUpdate}>
                  開始
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Dialog open={isUrlModalOpen} onOpenChange={setIsUrlModalOpen}>
            <DialogTrigger asChild>
              <Button
                disabled={
                  isLoading ||
                  ["waiting", "in_progress", "error"].includes(placeBatchStatus)
                }
                size="sm"
                className="w-full sm:w-auto"
              >
                <Database className="mr-2 h-4 w-4" />
                個別でクチコミ保存
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-center">
                  個別でクチコミ保存
                </DialogTitle>
              </DialogHeader>
              <div className="max-h-[60vh] overflow-y-auto pr-2">
                <DialogDescription className="text-left">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <LinkIcon className="mt-1 h-5 w-5 flex-shrink-0 text-blue-500" />
                      <div>
                        <p className="font-semibold text-foreground">
                          URLの形式:
                        </p>
                        <p className="break-all text-sm text-muted-foreground">
                          https://www.google.com/maps/contrib/{contributorId}
                          /place/[任意の文字列]
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Search className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
                      <div>
                        <p className="font-semibold text-foreground">
                          クチコミURLの見つけ方:
                        </p>
                        <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
                          <li>
                            <a
                              href={`https://www.google.com/maps/contrib/${contributorId}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="break-all text-blue-600 hover:underline"
                            >
                              https://www.google.com/maps/contrib/
                              {contributorId}
                            </a>
                            にアクセス
                          </li>
                          <li>「クチコミ」タブをクリック</li>
                          <li>保存したいクチコミをクリック</li>
                          <li>表示されたURLをコピー</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </DialogDescription>
                <div className="mt-4 space-y-4">
                  {urls.map((url, index) => (
                    <div key={index} className="space-y-2">
                      <Label
                        htmlFor={`url-${index}`}
                        className="text-foreground"
                      >
                        URL {index + 1}
                      </Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id={`url-${index}`}
                          type="text"
                          value={url}
                          onChange={(e) =>
                            handleUrlChange(index, e.target.value)
                          }
                          placeholder="https://www.google.com/maps/contrib/..."
                          className="flex-grow"
                        />
                        {index === urls.length - 1 && (
                          <Button
                            onClick={handleAddUrl}
                            size="icon"
                            variant="outline"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      {urlErrors[index] && (
                        <p className="flex items-center text-sm text-red-500">
                          <AlertCircle className="mr-1 h-4 w-4" />
                          {urlErrors[index]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={handleSaveUrls}
                  disabled={
                    urls.every((url) => url.trim() === "") ||
                    urlErrors.some((error) => error !== "")
                  }
                  className="w-full"
                >
                  <Save className="mr-2 h-4 w-4" />
                  保存
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          {batchStatus !== "idle" && (
            <div className="w-full sm:w-auto">
              <StatusBadge batchStatus={batchStatus} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
