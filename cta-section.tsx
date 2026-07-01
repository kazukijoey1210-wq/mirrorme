import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="container-page py-14">
      <div className="overflow-hidden rounded-[2rem] bg-charcoal-sheen p-7 text-white shadow-lift md:p-12">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-sm font-bold text-rose-200">Start styling</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-normal md:text-4xl">まずは3分、似合う方向性を見つけよう。</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/72">
              診断結果は保存でき、相性のよい学生スタイリストへの予約リクエストに共有できます。
            </p>
          </div>
          <Button variant="rose" size="lg" asChild>
            <Link href="/diagnosis">
              診断を始める
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
