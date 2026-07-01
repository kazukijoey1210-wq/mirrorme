import Link from "next/link";
import { CalendarCheck, MapPin, MonitorSmartphone } from "lucide-react";

import { AvatarMark } from "@/components/avatar-mark";
import { RatingStars } from "@/components/rating-stars";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import type { Stylist } from "@/types";

export function StylistProfileHeader({ stylist }: { stylist: Stylist }) {
  return (
    <Card className="overflow-hidden">
      <div className="bg-rose-glow p-6 md:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <AvatarMark name={stylist.displayName} tone={stylist.avatarTone} />
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-3xl font-extrabold tracking-normal text-zinc-950">{stylist.displayName}</h1>
              {stylist.available ? <Badge variant="dark">予約可能</Badge> : <Badge variant="outline">受付調整中</Badge>}
            </div>
            <p className="mt-2 text-sm font-semibold text-zinc-700">{stylist.schoolOrBackground}</p>
            <div className="mt-3 flex flex-wrap gap-3 text-sm font-semibold text-zinc-700">
              <RatingStars rating={stylist.rating} count={stylist.reviewCount} />
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{stylist.area}</span>
              <span className="flex items-center gap-1"><MonitorSmartphone className="h-4 w-4" />{stylist.onlineAvailable ? "オンライン可" : "対面のみ"}</span>
            </div>
          </div>
        </div>
        <p className="mt-5 max-w-3xl text-sm leading-7 text-zinc-700">{stylist.bio}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {stylist.specialties.map((specialty) => (
            <Badge key={specialty} variant="outline">{specialty}</Badge>
          ))}
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button size="lg" asChild>
            <Link href={`/bookings/new?stylistId=${stylist.id}`}>
              <CalendarCheck className="mr-2 h-5 w-5" />
              予約リクエスト
            </Link>
          </Button>
          <p className="text-sm font-bold text-zinc-800">{formatPrice(stylist.priceMin, stylist.priceMax)}</p>
        </div>
      </div>
    </Card>
  );
}
