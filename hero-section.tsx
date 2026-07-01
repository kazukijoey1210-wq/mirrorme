import Link from "next/link";
import { ArrowRight, CheckCircle2, HeartHandshake, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { siteConfig } from "@/lib/config";

export function HeroSection() {
  return (
    <section className="container-page grid min-h-[calc(100vh-5rem)] items-center gap-10 py-10 md:grid-cols-[1.05fr_0.95fr]">
      <div>
        <Badge variant="soft">Beauty tech for students</Badge>
        <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight tracking-normal text-zinc-950 md:text-6xl">
          似合うがわかる。相談できる。おしゃれがもっと楽しくなる。
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
          骨格・カラー・雰囲気診断から、あなたに合う学生スタイリストとの出会いまで。
          {siteConfig.name}は、自分らしいおしゃれを見つけるための診断＆マッチングサービスです。
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button size="lg" asChild>
            <Link href="/diagnosis">
              診断を始める
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/stylists/register">スタイリストとして登録する</Link>
          </Button>
        </div>
        <div className="mt-8 grid max-w-xl grid-cols-3 gap-3 text-sm">
          {["定型フォームで安全", "学生価格で相談", "管理者が公開管理"].map((item) => (
            <div key={item} className="flex items-center gap-2 rounded-2xl bg-white/70 p-3 font-semibold text-zinc-700">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-rose-500" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-sm">
        <div className="absolute -inset-5 rounded-[3rem] bg-rose-glow opacity-70 blur-2xl" />
        <Card className="relative overflow-hidden rounded-[2.4rem] border-zinc-950/10 bg-zinc-950 p-3 shadow-lift">
          <div className="rounded-[2rem] bg-premium-mist p-4">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-rose-500">{siteConfig.name}</p>
                <p className="text-lg font-extrabold text-zinc-950">Today&apos;s style map</p>
              </div>
              <Sparkles className="h-9 w-9 rounded-full bg-white p-2 text-rose-400 shadow-soft" />
            </div>
            <div className="space-y-3">
              <MockRow label="骨格" value="ウェーブ" width="w-10/12" />
              <MockRow label="カラー" value="ブルベ夏" width="w-8/12" />
              <MockRow label="雰囲気" value="フェミニン" width="w-9/12" />
            </div>
            <div className="mt-5 rounded-[1.5rem] bg-white p-4 shadow-soft">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-pink-200 to-violet-200">
                  <HeartHandshake className="h-5 w-5 text-zinc-900" />
                </div>
                <div>
                  <p className="text-sm font-extrabold text-zinc-950">相性 92%</p>
                  <p className="text-xs text-muted-foreground">透明感メイクが得意なMioさん</p>
                </div>
              </div>
              <Button className="mt-4 w-full" size="sm">
                予約リクエストへ
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

function MockRow({ label, value, width }: { label: string; value: string; width: string }) {
  return (
    <div className="rounded-2xl bg-white/88 p-3">
      <div className="flex items-center justify-between text-xs font-bold">
        <span className="text-muted-foreground">{label}</span>
        <span>{value}</span>
      </div>
      <div className="mt-3 h-2 rounded-full bg-zinc-100">
        <div className={`h-2 rounded-full bg-gradient-to-r from-rose-300 to-violet-300 ${width}`} />
      </div>
    </div>
  );
}
