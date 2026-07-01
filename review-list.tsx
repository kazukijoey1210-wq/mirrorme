import { RatingStars } from "@/components/rating-stars";
import { Card } from "@/components/ui/card";
import type { Stylist } from "@/types";

export function ReviewList({ stylist }: { stylist: Stylist }) {
  return (
    <div className="space-y-3">
      {stylist.reviews.map((review) => (
        <Card key={review.user} className="p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="font-bold">{review.user}</p>
            <RatingStars rating={review.rating} />
          </div>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{review.comment}</p>
        </Card>
      ))}
    </div>
  );
}
