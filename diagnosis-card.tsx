import Link from "next/link";
import { Palette, Shirt, Smile, Sparkles } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { DiagnosisDefinition } from "@/types";

const iconMap = {
  Sparkles,
  Palette,
  Smile,
  Shirt
};

export function DiagnosisCard({ diagnosis }: { diagnosis: DiagnosisDefinition }) {
  const Icon = iconMap[diagnosis.icon as keyof typeof iconMap] ?? Sparkles;
  return (
    <Card className="group transition hover:-translate-y-1 hover:shadow-lift">
      <CardHeader>
        <div className="mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-rose-glow">
          <Icon className="h-5 w-5 text-zinc-900" />
        </div>
        <CardTitle>{diagnosis.title}</CardTitle>
        <p className="text-sm leading-7 text-muted-foreground">{diagnosis.description}</p>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center justify-between text-sm font-semibold text-zinc-700">
          <span>所要時間</span>
          <span>{diagnosis.duration}</span>
        </div>
        <Button className="w-full" asChild>
          <Link href={`/diagnosis/${diagnosis.slug}`}>診断する</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
