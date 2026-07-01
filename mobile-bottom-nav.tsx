"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeartHandshake, Home, Search, Sparkles, UserRound } from "lucide-react";

import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "ホーム", icon: Home },
  { href: "/diagnosis", label: "診断", icon: Sparkles },
  { href: "/stylists", label: "探す", icon: Search },
  { href: "/bookings/new", label: "予約", icon: HeartHandshake },
  { href: "/mypage", label: "マイ", icon: UserRound }
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-3 bottom-3 z-50 rounded-full border border-white/75 bg-white/90 px-2 py-2 shadow-soft backdrop-blur-xl md:hidden">
      <div className="grid grid-cols-5 gap-1">
        {items.map((item) => {
          const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              href={item.href}
              key={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 rounded-full px-2 py-2 text-[10px] font-bold text-zinc-500 transition",
                active && "bg-zinc-950 text-white"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
