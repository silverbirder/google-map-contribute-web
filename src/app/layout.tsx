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
  title: "クチコミ仲間 | 同じ場所をクチコミした投稿者を見つけよう",
  description:
    "クチコミ仲間は、あなたと同じ場所をクチコミした仲間を見つけるためのアプリです。",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  keywords: ["クチコミ", "Googleマップ", "コントリビュータ", "口コミ仲間"],
  openGraph: {
    title: "クチコミ仲間",
    description: "同じ場所をクチコミした人を見つける",
    url: process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : undefined,
    // images: [],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`${GeistSans.variable}`}>
      <head>
        <link
          rel="apple-touch-icon"
          type="image/png"
          href="/apple-touch-icon.png"
        ></link>
        <link rel="icon" type="image/png" href="/icon-192x192.png"></link>
      </head>
      <body>
        <TRPCReactProvider>
          <div className="flex min-h-screen flex-col bg-background text-foreground">
            <main className="flex flex-1 flex-col items-center px-4 py-4 md:px-6 md:py-24">
              {children}
            </main>
            <footer className="border-t bg-muted/20 py-4">
              <div className="container flex items-center justify-between px-4 md:px-6">
                <p className="text-sm text-muted-foreground">
                  &copy; 2024 silverbirder. All rights reserved.
                </p>
                <nav className="flex items-center gap-4">
                  <Link
                    href="/privacy"
                    className="text-sm transition-colors hover:text-primary"
                    prefetch={false}
                  >
                    Privacy
                  </Link>
                  <Link
                    href="/terms"
                    className="text-sm transition-colors hover:text-primary"
                    prefetch={false}
                  >
                    Terms
                  </Link>
                  <Link
                    href="https://forms.gle/h4D8TuVAkstkaJZo8"
                    className="text-sm transition-colors hover:text-primary"
                    target="_blank"
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
