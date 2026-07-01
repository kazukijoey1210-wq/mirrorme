create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  display_name text,
  role text not null default 'customer' check (role in ('customer', 'stylist', 'admin')),
  age_group text,
  avatar_url text,
  is_suspended boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id)
);

create table if not exists public.diagnosis_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  bone_type text,
  color_type text,
  face_type text,
  fashion_type text,
  result_summary text,
  created_at timestamptz not null default now()
);

create table if not exists public.stylists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  display_name text not null,
  bio text not null,
  school_or_background text,
  specialties text[] not null default '{}',
  supported_bone_types text[] not null default '{}',
  supported_color_types text[] not null default '{}',
  supported_face_types text[] not null default '{}',
  supported_fashion_types text[] not null default '{}',
  area text,
  online_available boolean not null default true,
  price_min integer not null default 0,
  price_max integer not null default 0,
  profile_image_url text,
  sns_url text,
  notes text,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id)
);

alter table public.profiles alter column role set default 'customer';
update public.profiles set role = 'customer' where role = 'client';
alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles add constraint profiles_role_check check (role in ('customer', 'stylist', 'admin'));

alter table public.stylists add column if not exists sns_url text;
alter table public.stylists add column if not exists notes text;
alter table public.stylists alter column bio drop not null;
alter table public.stylists alter column display_name drop not null;

create table if not exists public.stylist_menus (
  id uuid primary key default gen_random_uuid(),
  stylist_id uuid not null references public.stylists(id) on delete cascade,
  title text not null,
  description text,
  price integer not null default 0,
  duration_minutes integer not null default 30,
  is_online_available boolean not null default true,
  is_offline_available boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.portfolios (
  id uuid primary key default gen_random_uuid(),
  stylist_id uuid not null references public.stylists(id) on delete cascade,
  image_url text not null,
  caption text,
  created_at timestamptz not null default now()
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  stylist_id uuid not null references public.stylists(id) on delete cascade,
  menu_id uuid references public.stylist_menus(id) on delete set null,
  requested_date timestamptz not null,
  consultation_type text not null check (consultation_type in ('online', 'offline')),
  theme text,
  message text,
  share_diagnosis boolean not null default true,
  status text not null default 'pending' check (status in ('pending', 'accepted', 'declined', 'canceled', 'completed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  stylist_id uuid not null references public.stylists(id) on delete cascade,
  rating integer not null check (rating between 1 and 5),
  comment text,
  created_at timestamptz not null default now()
);

create table if not exists public.favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  stylist_id uuid not null references public.stylists(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(user_id, stylist_id)
);

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_user_id uuid not null references auth.users(id) on delete cascade,
  target_user_id uuid references auth.users(id) on delete set null,
  target_stylist_id uuid references public.stylists(id) on delete set null,
  reason text not null,
  status text not null default 'open' check (status in ('open', 'reviewing', 'resolved', 'dismissed')),
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where user_id = auth.uid()
      and role = 'admin'
      and is_suspended = false
  );
$$;

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (user_id, display_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
    coalesce(nullif(new.raw_user_meta_data->>'role', 'client'), 'customer')
  )
  on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

drop trigger if exists profiles_touch_updated_at on public.profiles;
create trigger profiles_touch_updated_at
before update on public.profiles
for each row execute function public.touch_updated_at();

drop trigger if exists stylists_touch_updated_at on public.stylists;
create trigger stylists_touch_updated_at
before update on public.stylists
for each row execute function public.touch_updated_at();

drop trigger if exists bookings_touch_updated_at on public.bookings;
create trigger bookings_touch_updated_at
before update on public.bookings
for each row execute function public.touch_updated_at();

alter table public.profiles enable row level security;
alter table public.diagnosis_results enable row level security;
alter table public.stylists enable row level security;
alter table public.stylist_menus enable row level security;
alter table public.portfolios enable row level security;
alter table public.bookings enable row level security;
alter table public.reviews enable row level security;
alter table public.favorites enable row level security;
alter table public.reports enable row level security;

create policy "profiles own select" on public.profiles for select using (user_id = auth.uid() or public.is_admin());
create policy "profiles own insert" on public.profiles for insert with check (user_id = auth.uid());
create policy "profiles own update" on public.profiles for update using (user_id = auth.uid() or public.is_admin());

create policy "diagnosis own select" on public.diagnosis_results for select using (user_id = auth.uid() or public.is_admin());
create policy "diagnosis own insert" on public.diagnosis_results for insert with check (user_id = auth.uid());

create policy "published stylists select" on public.stylists for select using (is_published = true or user_id = auth.uid() or public.is_admin());
create policy "stylists own insert" on public.stylists for insert with check (user_id = auth.uid());
create policy "stylists own update" on public.stylists for update using (user_id = auth.uid() or public.is_admin());

create policy "public menus select" on public.stylist_menus for select using (
  exists (select 1 from public.stylists s where s.id = stylist_id and (s.is_published = true or s.user_id = auth.uid() or public.is_admin()))
);
create policy "stylist menus manage" on public.stylist_menus for all using (
  exists (select 1 from public.stylists s where s.id = stylist_id and (s.user_id = auth.uid() or public.is_admin()))
);

create policy "public portfolios select" on public.portfolios for select using (
  exists (select 1 from public.stylists s where s.id = stylist_id and (s.is_published = true or s.user_id = auth.uid() or public.is_admin()))
);
create policy "stylist portfolios manage" on public.portfolios for all using (
  exists (select 1 from public.stylists s where s.id = stylist_id and (s.user_id = auth.uid() or public.is_admin()))
);

create policy "bookings participant select" on public.bookings for select using (
  user_id = auth.uid()
  or public.is_admin()
  or exists (select 1 from public.stylists s where s.id = stylist_id and s.user_id = auth.uid())
);
create policy "bookings client insert" on public.bookings for insert with check (user_id = auth.uid());
create policy "bookings participant update" on public.bookings for update using (
  user_id = auth.uid()
  or public.is_admin()
  or exists (select 1 from public.stylists s where s.id = stylist_id and s.user_id = auth.uid())
);

create policy "reviews public select" on public.reviews for select using (
  exists (select 1 from public.stylists s where s.id = stylist_id and s.is_published = true)
);
create policy "reviews own insert" on public.reviews for insert with check (user_id = auth.uid());

create policy "favorites own manage" on public.favorites for all using (user_id = auth.uid() or public.is_admin()) with check (user_id = auth.uid());

create policy "reports own insert" on public.reports for insert with check (reporter_user_id = auth.uid());
create policy "reports admin select" on public.reports for select using (reporter_user_id = auth.uid() or public.is_admin());
create policy "reports admin update" on public.reports for update using (public.is_admin());

insert into storage.buckets (id, name, public)
values ('stylist-assets', 'stylist-assets', true)
on conflict (id) do nothing;

create policy "public stylist assets read" on storage.objects for select using (bucket_id = 'stylist-assets');
create policy "authenticated stylist assets upload" on storage.objects for insert with check (
  bucket_id = 'stylist-assets' and auth.role() = 'authenticated'
);
create policy "owner stylist assets update" on storage.objects for update using (
  bucket_id = 'stylist-assets' and owner = auth.uid()
);
