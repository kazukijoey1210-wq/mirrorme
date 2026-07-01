import { ShieldCheck } from "lucide-react";

export function SafetyNotice() {
  return (
    <div className="rounded-[1.5rem] border border-rose-100 bg-rose-50/80 p-5 text-sm leading-7 text-zinc-700">
      <div className="mb-2 flex items-center gap-2 font-bold text-zinc-950">
        <ShieldCheck className="h-5 w-5 text-rose-500" />
        安心して使うために
      </div>
      自由チャットは初期版では提供せず、予約リクエストは定型フォーム中心です。
      個人の住所・電話番号は表示せず、不安な相手や内容は通報できます。
      この診断はファッションを楽しむための参考情報で、専門的・医学的な診断ではありません。
    </div>
  );
}
