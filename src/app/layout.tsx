import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  robots: {
    index: true,
  },
  title: "クチコミ仲間 | あなたのレビューを共有しよう",
  description:
    "クチコミ仲間は、あなたと同じ場所をレビューした仲間を見つけるためのアプリです。お気に入りの場所についてのレビューを共有し、他の人とつながりましょう。",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  keywords: [
    "レビュー",
    "クチコミ",
    "Googleマップ",
    "コントリビュータ",
    "口コミ仲間",
    "場所レビュー",
  ],
  openGraph: {
    title: "クチコミ仲間",
    description: "同じ場所をレビューした人とつながる",
    // url: "",
    // images: [],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Analytics />
      </body>
    </html>
  );
}
