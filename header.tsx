import Link from "next/link";
import { Sparkles } from "lucide-react";

import { SignOutButton } from "@/components/sign-out-button";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function Header() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = supabase ? await supabase.auth.getUser() : { data: { user: null } };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/70 bg-white/78 backdrop-blur-xl">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-extrabold tracking-normal text-zinc-950">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-charcoal-sheen text-white">
            <Sparkles className="h-4 w-4" />
          </span>
          {siteConfig.name}
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-rose-50 hover:text-zinc-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/mypage">マイページ</Link>
              </Button>
              <SignOutButton />
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">ログイン</Link>
              </Button>
              <Button size="sm" className="hidden sm:inline-flex" asChild>
                <Link href="/signup">無料登録</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
