"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, UploadCloud } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createSupabaseBrowserClient } from "@/lib/supabase";

const stylistSchema = z.object({
  displayName: z.string().min(2, "表示名を入力してください"),
  bio: z.string().min(30, "自己紹介は30文字以上で入力してください"),
  schoolOrBackground: z.string().min(2, "学校名または学習背景を入力してください"),
  specialties: z.string().min(2, "得意ジャンルを入力してください"),
  area: z.string().min(2, "対応エリアを入力してください"),
  onlineAvailable: z.enum(["true", "false"]),
  priceMin: z.coerce.number().min(0),
  priceMax: z.coerce.number().min(0),
  snsLink: z.string().url("URL形式で入力してください").optional().or(z.literal("")),
  notes: z.string().max(500, "500文字以内で入力してください").optional()
});

type StylistFormValues = z.infer<typeof stylistSchema>;

export function StylistRegisterForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<FileList | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const form = useForm<StylistFormValues>({
    resolver: zodResolver(stylistSchema),
    defaultValues: {
      displayName: "",
      bio: "",
      schoolOrBackground: "",
      specialties: "",
      area: "",
      onlineAvailable: "true",
      priceMin: 1000,
      priceMax: 3000,
      snsLink: "",
      notes: ""
    }
  });

  async function onSubmit() {
    setLoading(true);
    setMessage(null);
    const supabase = createSupabaseBrowserClient();
    if (supabase && files?.length) {
      const uploads = Array.from(files).map((file) => {
        const path = `profiles/${crypto.randomUUID()}-${file.name}`;
        return supabase.storage.from("stylist-assets").upload(path, file, { upsert: false });
      });
      const results = await Promise.all(uploads);
      const failed = results.find((result) => result.error);
      if (failed?.error) {
        setMessage(failed.error.message);
        setLoading(false);
        return;
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 650));
    setSubmitted(true);
    setLoading(false);
  }

  if (submitted) {
    return (
      <Card className="p-6">
        <h2 className="text-2xl font-extrabold">プロフィール下書きを保存しました</h2>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          Supabase接続後は Storage に画像を保存し、管理者確認後に is_published を true にします。
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-5 md:p-6">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Input placeholder="表示名" {...form.register("displayName")} />
        <Textarea placeholder="自己紹介" {...form.register("bio")} />
        <Input placeholder="学校名または学習背景" {...form.register("schoolOrBackground")} />
        <Input placeholder="得意ジャンル 例: 韓国風, 透明感メイク, ブルベ夏" {...form.register("specialties")} />
        <div className="grid grid-cols-2 gap-3">
          <Input placeholder="対応エリア" {...form.register("area")} />
          <Select {...form.register("onlineAvailable")}>
            <option value="true">オンライン対応可</option>
            <option value="false">対面のみ</option>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Input type="number" placeholder="最低料金" {...form.register("priceMin")} />
          <Input type="number" placeholder="最高料金" {...form.register("priceMax")} />
        </div>
        <label className="grid min-h-36 place-items-center rounded-[1.25rem] border border-dashed border-rose-200 bg-rose-50/60 p-5 text-center text-sm font-semibold text-zinc-700">
          <UploadCloud className="mb-2 h-8 w-8 text-rose-400" />
          {files?.length ? `${files.length}件の画像を選択中` : "プロフィール画像・ポートフォリオ画像をアップロード"}
          <input className="sr-only" type="file" multiple accept="image/*" onChange={(event) => setFiles(event.target.files)} />
        </label>
        <Input placeholder="SNSリンク（任意）" {...form.register("snsLink")} />
        <Textarea placeholder="注意事項（対面相談のルール、返信目安など）" {...form.register("notes")} />
        {Object.values(form.formState.errors).length ? (
          <div className="rounded-2xl bg-rose-50 p-3 text-sm font-semibold text-rose-700">
            入力内容を確認してください。
          </div>
        ) : null}
        {message ? <div className="rounded-2xl bg-rose-50 p-3 text-sm font-semibold text-rose-700">{message}</div> : null}
        <Button className="w-full" size="lg" disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          プロフィールを保存
        </Button>
      </form>
    </Card>
  );
}
