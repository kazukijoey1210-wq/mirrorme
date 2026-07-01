import { initials } from "@/lib/utils";

export function AvatarMark({ name, tone, size = "lg" }: { name: string; tone: string; size?: "sm" | "md" | "lg" }) {
  const sizeClass = size === "sm" ? "h-12 w-12 text-sm" : size === "md" ? "h-16 w-16 text-lg" : "h-24 w-24 text-2xl";
  return (
    <div
      className={`grid ${sizeClass} place-items-center rounded-full bg-gradient-to-br ${tone} font-bold text-zinc-800 ring-4 ring-white`}
      aria-label={`${name}のプロフィール画像`}
    >
      {initials(name)}
    </div>
  );
}
