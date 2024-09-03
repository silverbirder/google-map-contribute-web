import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

import { TRPCReactProvider } from "~/trpc/react";
import Link from "next/link";

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
        <TRPCReactProvider>
          <div className="bg-background text-foreground flex min-h-screen flex-col">
            <header className="bg-background sticky top-0 z-10 border-b">
              <div className="container flex h-16 items-center justify-between px-4 md:px-6">
                <div className="flex items-center gap-4">
                  <Link href="#" className="text-lg font-bold" prefetch={false}>
                    クチコミ仲間
                  </Link>
                </div>
              </div>
            </header>
            <main className="container flex-1 px-4 py-8 md:px-6">
              {children}
            </main>
            <footer className="bg-muted/20 border-t py-4">
              <div className="container flex items-center justify-between px-4 md:px-6">
                <p className="text-muted-foreground text-sm">
                  &copy; 2024 silverbirder. All rights reserved.
                </p>
                <nav className="flex items-center gap-4">
                  <Link
                    href="#"
                    className="hover:text-primary text-sm transition-colors"
                    prefetch={false}
                  >
                    Privacy
                  </Link>
                  <Link
                    href="#"
                    className="hover:text-primary text-sm transition-colors"
                    prefetch={false}
                  >
                    Terms
                  </Link>
                  <Link
                    href="#"
                    className="hover:text-primary text-sm transition-colors"
                    prefetch={false}
                  >
                    Contact
                  </Link>
                </nav>
              </div>
            </footer>
          </div>
        </TRPCReactProvider>
        <Analytics />
      </body>
    </html>
  );
}
