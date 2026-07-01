import Link from "next/link";
import { Heart, MapPin, MonitorSmartphone } from "lucide-react";

import { AvatarMark } from "@/components/avatar-mark";
import { RatingStars } from "@/components/rating-stars";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import type { Stylist } from "@/types";

export function StylistCard({ stylist, score }: { stylist: Stylist; score?: number }) {
  return (
    <Card className="group overflow-hidden p-4 transition hover:-translate-y-1 hover:shadow-lift">
      <div className="flex gap-4">
        <AvatarMark name={stylist.displayName} tone={stylist.avatarTone} />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-extrabold text-zinc-950">{stylist.displayName}</h3>
                {stylist.available ? <Badge variant="soft">予約可</Badge> : <Badge variant="outline">受付調整中</Badge>}
              </div>
              <RatingStars rating={stylist.rating} count={stylist.reviewCount} />
            </div>
            <button className="grid h-10 w-10 place-items-center rounded-full bg-white text-rose-400 shadow-sm transition hover:bg-rose-50" aria-label="お気に入り">
              <Heart className="h-5 w-5" />
            </button>
          </div>
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">{stylist.bio}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {stylist.specialties.slice(0, 3).map((item) => (
              <Badge key={item} variant="outline">{item}</Badge>
            ))}
          </div>
          <div className="mt-4 grid gap-2 text-xs font-semibold text-zinc-600 sm:grid-cols-2">
            <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{stylist.area}</span>
            <span className="flex items-center gap-1"><MonitorSmartphone className="h-4 w-4" />{stylist.onlineAvailable ? "オンライン対応" : "対面のみ"}</span>
            <span>{formatPrice(stylist.priceMin, stylist.priceMax)}</span>
            {typeof score === "number" ? <span>相性スコア {score}</span> : <span>新着順でも人気</span>}
          </div>
          <Button className="mt-4 w-full" asChild>
            <Link href={`/stylists/${stylist.id}`}>詳細を見る</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
