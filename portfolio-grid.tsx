import type { Stylist } from "@/types";

export function PortfolioGrid({ stylist }: { stylist: Stylist }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {stylist.portfolio.map((item) => (
        <div key={item.caption} className="overflow-hidden rounded-[1.25rem] bg-white shadow-soft">
          <div className={`aspect-[4/5] bg-gradient-to-br ${item.imageTone}`} />
          <p className="p-3 text-xs font-semibold text-zinc-700">{item.caption}</p>
        </div>
      ))}
    </div>
  );
}
