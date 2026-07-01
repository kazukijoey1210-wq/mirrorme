import type { User } from "@supabase/supabase-js";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Profile, Role } from "@/types";

export function normalizeRole(role: unknown): Role {
  if (role === "stylist" || role === "admin" || role === "customer") return role;
  if (role === "client") return "customer";
  return "customer";
}

export async function getAuthContext() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return { supabase: null, user: null, profile: null };
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return { supabase, user: null, profile: null };
  }

  const profile = await getOrCreateProfile(user);
  return { supabase, user, profile };
}

export async function getOrCreateProfile(user: User): Promise<Profile | null> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;

  const { data: existing } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (existing) {
    return {
      ...existing,
      role: normalizeRole(existing.role)
    } as Profile;
  }

  const role = normalizeRole(user.user_metadata?.role);
  const displayName =
    typeof user.user_metadata?.display_name === "string"
      ? user.user_metadata.display_name
      : user.email?.split("@")[0] ?? "MIRRORME user";

  const { data } = await supabase
    .from("profiles")
    .upsert(
      {
        user_id: user.id,
        display_name: displayName,
        role
      },
      { onConflict: "user_id" }
    )
    .select("*")
    .single();

  return data ? ({ ...data, role: normalizeRole(data.role) } as Profile) : null;
}
