"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { SearchIcon, CopyIcon, CheckIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";

export default function Page() {
  const [step, setStep] = useState(1);
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleCopy = async () => {
    await navigator.clipboard.writeText("https://www.google.com/maps/contrib/");
    setCopied(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 正規表現でURLから数字を抽出
    const match = /\/contrib\/(\d+)/.exec(url);

    if (match?.[1]) {
      // 数字があればページ遷移
      const contributorId = match[1];
      router.push(`/contributes/${contributorId}`);
    } else {
      // 数字がなければエラーメッセージをセット
      setError(
        "正しいURLを入力してください。URLには投稿者ID (数字) が含まれている必要があります。",
      );
    }
  };

  return (
    <div className="w-full max-w-xl space-y-6 p-4">
      <h1 className="text-center text-3xl font-bold text-foreground md:text-5xl">
        クチコミで
        <br />
        共通の仲間を探そう！
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>Google Maps 投稿者IDを取得</CardTitle>
          <CardDescription>
            以下の手順に従って、あなたの投稿者IDを見つけましょう。
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 1 && (
            <>
              <p className="text-sm">
                1. 以下のリンクをクリックしてGoogle
                Mapsの投稿者ページを開きます。
              </p>
              <div className="flex items-center space-x-2">
                <Input value="https://www.google.com/maps/contrib/" readOnly />
                <Button variant="outline" size="icon" onClick={handleCopy}>
                  {copied ? (
                    <CheckIcon className="h-4 w-4" />
                  ) : (
                    <CopyIcon className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <Button
                onClick={() =>
                  window.open("https://www.google.com/maps/contrib/", "_blank")
                }
              >
                投稿者ページを開く
              </Button>
              <p className="text-sm">
                2.
                ページが読み込まれたら、ブラウザのアドレスバーに表示されるURLをコピーしてください。
              </p>
              <Button onClick={() => setStep(2)}>次へ</Button>
            </>
          )}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="url-input">
                  3. コピーしたURLをここに貼り付けてください：
                </Label>
                <Input
                  id="url-input"
                  type="url"
                  placeholder="https://www.google.com/maps/contrib/..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                />
                {error && <p className="text-sm text-red-500">{error}</p>}
              </div>
              <Button type="submit">
                <SearchIcon className="mr-2 h-4 w-4" />
                検索
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          <p className="text-sm text-muted-foreground">注意:</p>
          <ul className="list-disc space-y-1 pl-5 text-xs text-muted-foreground">
            <li>
              URLが &quot;https://www.google.com/maps/contrib/数字&quot;
              の形式になるまでお待ちください。
            </li>
          </ul>
        </CardFooter>
      </Card>
    </div>
  );
}
