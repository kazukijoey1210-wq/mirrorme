import { BookingForm } from "@/components/booking-form";
import { SectionHeading } from "@/components/section-heading";
import { StylistCard } from "@/components/stylist-card";
import { getStylist, stylists } from "@/lib/stylists";

export default async function BookingNewPage({ searchParams }: { searchParams: Promise<{ stylistId?: string }> }) {
  const { stylistId } = await searchParams;
  const stylist = (stylistId && getStylist(stylistId)) || stylists[0];

  return (
    <div className="container-page py-10">
      <SectionHeading
        eyebrow="Booking request"
        title="予約リクエスト"
        description="自由チャットではなく、相談テーマと希望日時をフォームで送ります。送信後のステータスは pending です。"
      />
      <div className="mt-8 grid gap-6 lg:grid-cols-[420px_1fr]">
        <div>
          <StylistCard stylist={stylist} />
        </div>
        <BookingForm stylist={stylist} />
      </div>
    </div>
  );
}
