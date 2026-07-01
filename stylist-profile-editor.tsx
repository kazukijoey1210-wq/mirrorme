"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { StylistProfileRow } from "@/types";

const optionalUrl = z.string().url("URL形式で入力してください").optional().or(z.literal(""));

const stylistProfileSchema = z
  .object({
    displayName: z.string().min(2, "表示名を入力してください"),
    profileImageUrl: optionalUrl,
    bio: z.string().min(30, "自己紹介は30文字以上で入力してください"),
    schoolOrBackground: z.string().min(2, "学校名または学習背景を入力してください"),
    specialties: z.string().min(2, "得意ジャンルを入力してください"),
    supportedBoneTypes: z.string().min(1, "対応できる骨格タイプを入力してください"),
    supportedColorTypes: z.string().min(1, "対応できるパーソナルカラーを入力してください"),
    supportedFaceTypes: z.string().min(1, "対応できる顔タイプ・雰囲気を入力してください"),
    supportedFashionTypes: z.string().min(1, "対応できるファッション系統を入力してください"),
    area: z.string().min(2, "対応エリアを入力してください"),
    onlineAvailable: z.enum(["true", "false"]),
    priceMin: z.coerce.number().min(0, "最低料金を入力してください"),
    priceMax: z.coerce.number().min(0, "最高料金を入力してください"),
    snsUrl: optionalUrl,
    notes: z.string().max(800, "注意事項は800文字以内で入力してください").optional(),
    isPublished: z.enum(["true", "false"])
  })
  .refine((value) => value.priceMax >= value.priceMin, {
    message: "最高料金は最低料金以上にしてください",
    path: ["priceMax"]
  });

type StylistProfileValues = z.infer<typeof stylistProfileSchema>;

export function StylistProfileEditor({ existing }: { existing: StylistProfileRow | null }) {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const form = useForm<StylistProfileValues>({
    resolver: zodResolver(stylistProfileSchema),
    defaultValues: {
      displayName: existing?.display_name ?? "",
      profileImageUrl: existing?.profile_image_url ?? "",
      bio: existing?.bio ?? "",
      schoolOrBackground: existing?.school_or_background ?? "",
      specialties: toText(existing?.specialties),
      supportedBoneTypes: toText(existing?.supported_bone_types),
      supportedColorTypes: toText(existing?.supported_color_types),
      supportedFaceTypes: toText(existing?.supported_face_types),
      supportedFashionTypes: toText(existing?.supported_fashion_types),
      area: existing?.area ?? "",
      onlineAvailable: existing?.online_available === false ? "false" : "true",
      priceMin: existing?.price_min ?? 1000,
      priceMax: existing?.price_max ?? 3000,
      snsUrl: existing?.sns_url ?? "",
      notes: existing?.notes ?? "",
      isPublished: existing?.is_published ? "true" : "false"
    }
  });

  async function onSubmit(values: StylistProfileValues) {
    setLoading(true);
    setError(null);
    setMessage(null);
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setError("Supabase環境変数が未設定です。");
      setLoading(false);
      return;
    }

    const {
      data: { user }
    } = await supabase.auth.getUser();
    if (!user) {
      setError("ログインが必要です。");
      setLoading(false);
      return;
    }

    const { error: saveError } = await supabase.from("stylists").upsert(
      {
        user_id: user.id,
        display_name: values.displayName,
        profile_image_url: values.profileImageUrl || null,
        bio: values.bio,
        school_or_background: values.schoolOrBackground,
        specialties: toArray(values.specialties),
        supported_bone_types: toArray(values.supportedBoneTypes),
        supported_color_types: toArray(values.supportedColorTypes),
        supported_face_types: toArray(values.supportedFaceTypes),
        supported_fashion_types: toArray(values.supportedFashionTypes),
        area: values.area,
        online_available: values.onlineAvailable === "true",
        price_min: values.priceMin,
        price_max: values.priceMax,
        sns_url: values.snsUrl || null,
        notes: values.notes || null,
        is_published: values.isPublished === "true"
      },
      { onConflict: "user_id" }
    );

    if (saveError) {
      setError(saveError.message);
    } else {
      setMessage("スタイリストプロフィールを保存しました。");
      router.refresh();
    }
    setLoading(false);
  }

  return (
    <Card className="p-5 md:p-6">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="表示名" error={form.formState.errors.displayName?.message}>
            <Input {...form.register("displayName")} placeholder="例: Mio K." />
          </Field>
          <Field label="プロフィール画像URL" error={form.formState.errors.profileImageUrl?.message}>
            <Input {...form.register("profileImageUrl")} placeholder="https://..." />
          </Field>
        </div>
        <Field label="自己紹介" error={form.formState.errors.bio?.message}>
          <Textarea {...form.register("bio")} placeholder="得意な提案、相談しやすい雰囲気、学生向けの強みを書いてください。" />
        </Field>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="学校名または学習背景" error={form.formState.errors.schoolOrBackground?.message}>
            <Input {...form.register("schoolOrBackground")} placeholder="美容専門学校 メイク専攻" />
          </Field>
          <Field label="対応エリア" error={form.formState.errors.area?.message}>
            <Input {...form.register("area")} placeholder="東京 / オンライン" />
          </Field>
        </div>
        <Field label="得意ジャンル" error={form.formState.errors.specialties?.message}>
          <Input {...form.register("specialties")} placeholder="韓国風, 透明感メイク, ブルベ夏" />
        </Field>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="対応できる骨格タイプ" error={form.formState.errors.supportedBoneTypes?.message}>
            <Input {...form.register("supportedBoneTypes")} placeholder="ストレート, ウェーブ" />
          </Field>
          <Field label="対応できるパーソナルカラー" error={form.formState.errors.supportedColorTypes?.message}>
            <Input {...form.register("supportedColorTypes")} placeholder="イエベ春, ブルベ夏" />
          </Field>
          <Field label="対応できる顔タイプ・雰囲気" error={form.formState.errors.supportedFaceTypes?.message}>
            <Input {...form.register("supportedFaceTypes")} placeholder="フェミニン, きれいめ" />
          </Field>
          <Field label="対応できるファッション系統" error={form.formState.errors.supportedFashionTypes?.message}>
            <Input {...form.register("supportedFashionTypes")} placeholder="韓国風, きれいめカジュアル" />
          </Field>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          <Field label="オンライン対応" error={form.formState.errors.onlineAvailable?.message}>
            <Select {...form.register("onlineAvailable")}>
              <option value="true">対応可</option>
              <option value="false">対面のみ</option>
            </Select>
          </Field>
          <Field label="最低料金" error={form.formState.errors.priceMin?.message}>
            <Input type="number" {...form.register("priceMin")} />
          </Field>
          <Field label="最高料金" error={form.formState.errors.priceMax?.message}>
            <Input type="number" {...form.register("priceMax")} />
          </Field>
          <Field label="公開状態" error={form.formState.errors.isPublished?.message}>
            <Select {...form.register("isPublished")}>
              <option value="false">非公開</option>
              <option value="true">公開</option>
            </Select>
          </Field>
        </div>
        <Field label="SNSリンク" error={form.formState.errors.snsUrl?.message}>
          <Input {...form.register("snsUrl")} placeholder="https://instagram.com/..." />
        </Field>
        <Field label="注意事項" error={form.formState.errors.notes?.message}>
          <Textarea {...form.register("notes")} placeholder="返信目安、対面相談のルール、未成年の方への注意など" />
        </Field>
        {message ? (
          <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 p-4 text-sm font-bold text-emerald-700">
            <CheckCircle2 className="h-5 w-5" />
            {message}
          </div>
        ) : null}
        {error ? <div className="rounded-2xl bg-rose-50 p-4 text-sm font-bold text-rose-700">{error}</div> : null}
        <Button className="w-full" size="lg" disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          保存する
        </Button>
      </form>
    </Card>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-zinc-800">{label}</span>
      {children}
      {error ? <span className="mt-1 block text-xs font-semibold text-rose-600">{error}</span> : null}
    </label>
  );
}

function toArray(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function toText(value: string[] | null | undefined) {
  return value?.join(", ") ?? "";
}
