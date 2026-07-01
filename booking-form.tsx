"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarCheck, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createSupabaseBrowserClient } from "@/lib/supabase";
import type { Stylist } from "@/types";

const bookingSchema = z.object({
  requestedDate: z.string().min(1, "希望日時を選んでください"),
  consultationType: z.enum(["online", "offline"]),
  theme: z.string().min(1, "相談テーマを選んでください"),
  menuId: z.string().min(1, "メニューを選んでください"),
  shareDiagnosis: z.boolean().default(true),
  message: z.string().min(10, "相談内容は10文字以上で入力してください").max(500, "500文字以内で入力してください")
});

type BookingValues = z.infer<typeof bookingSchema>;

export function BookingForm({ stylist }: { stylist: Stylist }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const form = useForm<BookingValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      menuId: stylist.menus[0]?.id ?? "",
      consultationType: "online",
      theme: "似合う服",
      shareDiagnosis: true,
      message: ""
    }
  });

  async function onSubmit(values: BookingValues) {
    setLoading(true);
    setMessage(null);
    const supabase = createSupabaseBrowserClient();
    const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (supabase && uuidPattern.test(stylist.id)) {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        const { error } = await supabase.from("bookings").insert({
          user_id: data.user.id,
          stylist_id: stylist.id,
          menu_id: values.menuId,
          requested_date: values.requestedDate,
          consultation_type: values.consultationType,
          theme: values.theme,
          message: values.message,
          share_diagnosis: values.shareDiagnosis,
          status: "pending"
        });
        if (error) {
          setMessage(error.message);
          setLoading(false);
          return;
        }
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 650));
    setSubmitted(true);
    setLoading(false);
  }

  if (submitted) {
    return (
      <Card className="p-6 text-center">
        <CalendarCheck className="mx-auto h-12 w-12 rounded-full bg-rose-50 p-3 text-rose-500" />
        <h2 className="mt-4 text-2xl font-extrabold">予約リクエストを送信しました</h2>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          ステータスは pending です。初期版では自由チャットを使わず、管理された予約フォームで安全にやり取りします。
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-5 md:p-6">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Select {...form.register("menuId")}>
          {stylist.menus.map((menu) => (
            <option key={menu.id} value={menu.id}>{menu.title} / ¥{menu.price.toLocaleString()}</option>
          ))}
        </Select>
        <div>
          <Input type="datetime-local" {...form.register("requestedDate")} />
          {form.formState.errors.requestedDate ? <p className="mt-1 text-xs font-semibold text-rose-600">{form.formState.errors.requestedDate.message}</p> : null}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Select {...form.register("consultationType")}>
            <option value="online">オンライン</option>
            <option value="offline">対面</option>
          </Select>
          <Select {...form.register("theme")}>
            <option>似合う服</option>
            <option>メイク</option>
            <option>髪型</option>
            <option>買い物相談</option>
            <option>面接・発表</option>
          </Select>
        </div>
        <label className="flex items-center gap-3 rounded-2xl bg-white/70 p-4 text-sm font-semibold">
          <input type="checkbox" className="h-5 w-5 accent-zinc-950" {...form.register("shareDiagnosis")} />
          診断結果をスタイリストに共有する
        </label>
        <div>
          <Textarea placeholder="相談したい内容、予算、避けたい服装などを書いてください。" {...form.register("message")} />
          {form.formState.errors.message ? <p className="mt-1 text-xs font-semibold text-rose-600">{form.formState.errors.message.message}</p> : null}
        </div>
        {message ? <p className="rounded-2xl bg-rose-50 p-3 text-sm font-semibold text-rose-700">{message}</p> : null}
        <Button className="w-full" size="lg" disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          pendingで送信する
        </Button>
      </form>
    </Card>
  );
}
