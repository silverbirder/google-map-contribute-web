"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  SearchIcon,
  CopyIcon,
  CheckIcon,
  Users,
  MapPin,
  Star,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { AlertTriangle } from "lucide-react";

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

    const match = /\/contrib\/(\d+)/.exec(url);

    if (match?.[1]) {
      const contributorId = match[1];
      router.push(`/contributes/${contributorId}`);
    } else {
      setError(
        "正しいURLを入力してください。URLには投稿者ID (数字) が含まれている必要があります。",
      );
    }
  };

  return (
    <div className="container mx-auto max-w-4xl space-y-12 p-4">
      <h1 className="text-center text-4xl font-bold text-foreground md:text-6xl">
        クチコミで
        <br />
        共通の仲間を探そう！
      </h1>

      <DemoSection />

      <Card>
        <CardHeader>
          <CardTitle id="how-to-contribute-id">
            Google Map 投稿者IDを取得
          </CardTitle>
          <CardDescription>
            以下の手順に従って、あなたの投稿者IDを見つけましょう。
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 1 && (
            <>
              <p className="text-sm">
                1. 以下のリンクをクリックしてGoogle
                Mapの投稿者ページを開きます。
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
              <div className="space-y-2 rounded-md border border-yellow-400 bg-yellow-50 p-4">
                <div className="flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-yellow-500" />
                </div>
                <ul className="list-disc space-y-1 pl-5 text-sm text-yellow-800">
                  <li>
                    Google
                    Mapアプリが自動的に開く場合があります。そうした場合は、リンクをコピーしてブラウザの別タブで開いてください。
                  </li>
                  <li className="break-all">
                    URLが &quot;https://www.google.com/maps/contrib/数字&quot;
                    の形式になるまでお待ちください。
                  </li>
                </ul>
              </div>
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
      </Card>
    </div>
  );
}

function DemoSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>クチコミ仲間でできること</CardTitle>
        <CardDescription>
          あなたと同じ場所をクチコミした人を見つけ、新しい仲間とつながりましょう
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <Users className="mb-2 h-12 w-12 text-blue-500" />
            <h3 className="mb-2 text-lg font-semibold">仲間を見つける</h3>
            <p className="text-sm text-gray-600">
              あなたと同じ場所にクチコミを投稿した人を簡単に見つけられます
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <MapPin className="mb-2 h-12 w-12 text-green-500" />
            <h3 className="mb-2 text-lg font-semibold">共通の場所を発見</h3>
            <p className="text-sm text-gray-600">
              他の投稿者と共通してクチコミした場所を一目で確認できます
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Star className="mb-2 h-12 w-12 text-yellow-500" />
            <h3 className="mb-2 text-lg font-semibold">新しい発見</h3>
            <p className="text-sm text-gray-600">
              似た趣味を持つ人のクチコミから、新しい場所や体験を見つけられます
            </p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <Button
            size="lg"
            onClick={() =>
              document
                .getElementById("how-to-contribute-id")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            今すぐ試してみる
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
