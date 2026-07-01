-- Demo seed data for local visual checks.
-- Auth users are managed by Supabase Auth, so this seed focuses on public data shape.

insert into public.profiles (user_id, display_name, role, age_group)
values
  ('00000000-0000-0000-0000-000000000001', 'Demo Customer', 'customer', 'university'),
  ('00000000-0000-0000-0000-000000000002', 'Admin', 'admin', 'adult')
on conflict do nothing;

-- In a real Supabase project, create auth users first, then insert matching stylists.
