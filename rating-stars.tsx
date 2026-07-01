import { Star } from "lucide-react";

export function RatingStars({ rating, count }: { rating: number; count?: number }) {
  return (
    <div className="flex items-center gap-1 text-sm font-semibold text-zinc-800">
      <Star className="h-4 w-4 fill-amber-300 text-amber-300" />
      <span>{rating.toFixed(1)}</span>
      {count ? <span className="font-medium text-muted-foreground">({count})</span> : null}
    </div>
  );
}
