import Link from "next/link";

import { siteConfig } from "@/lib/config";

export function Footer() {
  return (
    <footer className="border-t border-white/80 bg-white/70 py-12 backdrop-blur">
      <div className="container-page grid gap-8 md:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="text-2xl font-extrabold text-zinc-950">{siteConfig.name}</p>
          <p className="mt-3 max-w-md text-sm leading-7 text-muted-foreground">
            似合うを決めつけず、楽しく試すための診断と学生スタイリスト相談サービスです。
            初期版では自由チャットと決済を実装せず、安全な予約リクエスト中心の体験にしています。
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm font-semibold text-zinc-700">
          {siteConfig.legal.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-full px-3 py-2 transition hover:bg-rose-50">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
