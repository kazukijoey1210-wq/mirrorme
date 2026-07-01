"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Chrome, Loader2, Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { siteConfig } from "@/lib/config";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { Role } from "@/types";

const authSchema = z.object({
  displayName: z.string().optional().or(z.literal("")),
  email: z.string().email("メールアドレスを入力してください"),
  password: z.string().min(8, "パスワードは8文字以上です"),
  role: z.enum(["customer", "stylist"]).optional()
});

type AuthValues = z.infer<typeof authSchema>;

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const form = useForm<AuthValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      displayName: "",
      email: "",
      password: "",
      role: "customer"
    }
  });

  async function ensureProfile(userId: string, displayName: string | undefined, role: Role) {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;
    await supabase.from("profiles").upsert(
      {
        user_id: userId,
        display_name: displayName || null,
        role
      },
      { onConflict: "user_id" }
    );
  }

  async function onSubmit(values: AuthValues) {
    setLoading(true);
    setMessage(null);
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setMessage("Supabase環境変数が未設定です。.env.localを設定してください。");
      setLoading(false);
      return;
    }

    if (mode === "signup") {
      if (!values.displayName || values.displayName.trim().length < 2) {
        form.setError("displayName", { message: "名前は2文字以上で入力してください" });
        setLoading(false);
        return;
      }
      const role = (values.role ?? "customer") as Role;
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            display_name: values.displayName,
            role
          }
        }
      });
      if (error) {
        setMessage(error.message);
      } else if (data.user && data.session) {
        await ensureProfile(data.user.id, values.displayName, role);
        router.push("/mypage");
        router.refresh();
      } else {
        setMessage("確認メールを送信しました。メール認証後にログインしてください。");
      }
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password
      });
      if (error) {
        setMessage(error.message);
      } else {
        const next = new URLSearchParams(window.location.search).get("next") || "/mypage";
        if (data.user) router.push(next);
        router.refresh();
      }
    }
    setLoading(false);
  }

  async function signInWithGoogle() {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setMessage("GoogleログインにはSupabase環境変数の設定が必要です。");
      return;
    }
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${location.origin}/auth/callback?next=/mypage` }
    });
  }

  return (
    <Card className="mx-auto max-w-md p-6">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-charcoal-sheen text-white">
          <Sparkles className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm font-bold text-rose-500">{siteConfig.name}</p>
          <h1 className="text-2xl font-extrabold">{mode === "login" ? "ログイン" : "無料登録"}</h1>
        </div>
      </div>
      <p className="mt-4 text-sm leading-7 text-muted-foreground">
        {mode === "login"
          ? "登録したメールアドレスとパスワードでログインします。"
          : "相談したい人・スタイリストのどちらで始めるか選んで登録できます。"}
      </p>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
        {mode === "signup" ? (
          <div>
            <Input placeholder="名前" {...form.register("displayName")} />
            {form.formState.errors.displayName ? (
              <p className="mt-1 text-xs font-semibold text-rose-600">{form.formState.errors.displayName.message}</p>
            ) : null}
          </div>
        ) : null}
        <div>
          <Input placeholder="メールアドレス" type="email" autoComplete="email" {...form.register("email")} />
          {form.formState.errors.email ? (
            <p className="mt-1 text-xs font-semibold text-rose-600">{form.formState.errors.email.message}</p>
          ) : null}
        </div>
        <div>
          <Input placeholder="パスワード" type="password" autoComplete={mode === "login" ? "current-password" : "new-password"} {...form.register("password")} />
          {form.formState.errors.password ? (
            <p className="mt-1 text-xs font-semibold text-rose-600">{form.formState.errors.password.message}</p>
          ) : null}
        </div>
        {mode === "signup" ? (
          <Select {...form.register("role")}>
            <option value="customer">相談したい人</option>
            <option value="stylist">スタイリストとして登録したい人</option>
          </Select>
        ) : null}
        {message ? <p className="rounded-2xl bg-rose-50 p-3 text-sm font-semibold text-rose-700">{message}</p> : null}
        <Button className="w-full" type="submit" disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {mode === "login" ? "ログインする" : "登録してマイページへ"}
        </Button>
      </form>
      <Button className="mt-3 w-full" variant="secondary" onClick={signInWithGoogle}>
        <Chrome className="mr-2 h-4 w-4" />
        Googleで続ける
      </Button>
      <p className="mt-5 text-center text-sm text-muted-foreground">
        {mode === "login" ? "アカウントがない方は " : "すでに登録済みの方は "}
        <Link className="font-bold text-zinc-950 underline" href={mode === "login" ? "/signup" : "/login"}>
          {mode === "login" ? "無料登録" : "ログイン"}
        </Link>
      </p>
    </Card>
  );
}
