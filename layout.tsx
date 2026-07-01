import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { siteConfig } from "@/lib/config";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | おしゃれ診断と学生スタイリストマッチング`,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ja">
      <body className="antialiased">
        <Header />
        <main className="mobile-safe-bottom min-h-screen pt-20">{children}</main>
        <Footer />
        <MobileBottomNav />
      </body>
    </html>
  );
}
