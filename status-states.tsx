import Link from "next/link";
import { AlertTriangle, Inbox, Loader2 } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function LoadingState({ label = "読み込み中です" }: { label?: string }) {
  return (
    <Card className="grid min-h-48 place-items-center p-8 text-center">
      <Loader2 className="mb-3 h-8 w-8 animate-spin text-rose-400" />
      <p className="font-semibold">{label}</p>
    </Card>
  );
}

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <Card className="grid min-h-48 place-items-center p-8 text-center">
      <Inbox className="mb-3 h-8 w-8 text-muted-foreground" />
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">{description}</p>
    </Card>
  );
}

export function ErrorState({ title = "うまく読み込めませんでした", description }: { title?: string; description: string }) {
  return (
    <Card className="grid min-h-48 place-items-center p-8 text-center">
      <AlertTriangle className="mb-3 h-8 w-8 text-rose-500" />
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">{description}</p>
      <Button className="mt-5" variant="secondary" asChild>
        <Link href="/">ホームへ戻る</Link>
      </Button>
    </Card>
  );
}
