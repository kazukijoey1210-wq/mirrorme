import { Bookmark, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { defaultResultDetail, resultDetails } from "@/lib/diagnosis";

export function ResultCard({ type }: { type: string }) {
  const detail = resultDetails[type] ?? defaultResultDetail;
  const rows = [
    ["似合う服", detail.clothes],
    ["似合う色", detail.colors],
    ["似合う髪型", detail.hair],
    ["似合うメイク", detail.makeup],
    ["おすすめ系統", detail.fashion],
    ["避けたいポイント", detail.avoid],
    ["買い物で見るべきポイント", detail.shopping]
  ];

  return (
    <Card className="overflow-hidden">
      <div className="bg-rose-glow p-6 md:p-8">
        <p className="text-sm font-bold text-zinc-700">あなたの診断タイプ</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-normal text-zinc-950 md:text-5xl">{type}</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-700">{detail.description}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button>
            <Bookmark className="mr-2 h-4 w-4" />
            保存する
          </Button>
          <Button variant="secondary">
            <Share2 className="mr-2 h-4 w-4" />
            友達に共有
          </Button>
        </div>
      </div>
      <div className="grid gap-3 p-5 md:grid-cols-2">
        {rows.map(([label, value]) => (
          <div key={label} className="rounded-2xl bg-white/70 p-4">
            <p className="text-xs font-bold text-rose-500">{label}</p>
            <p className="mt-2 text-sm leading-7 text-zinc-700">{value}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
