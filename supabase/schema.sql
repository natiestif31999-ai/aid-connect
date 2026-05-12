-- Supabase schema for Aid Connect ERP NGO platform

create extension if not exists pgcrypto;

-- Profiles and roles
create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  full_name text,
  avatar_url text,
  role text not null default 'viewer',
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create index if not exists idx_profiles_role on public.profiles(role);

-- Global settings engine
create table if not exists public.settings (
  id uuid primary key default gen_random_uuid(),
  site_title text not null default 'Aid Connect',
  site_tagline text,
  logo_url text,
  favicon_url text,
  primary_email text,
  primary_phone text,
  address text,
  social_links jsonb,
  seo_title text,
  seo_description text,
  maintenance_mode boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

-- Theme customizer
create table if not exists public.theme_settings (
  id uuid primary key default gen_random_uuid(),
  primary_color text not null default '#0ea5e9',
  secondary_color text not null default '#9333ea',
  background_color text not null default '#f8fafc',
  surface_color text not null default '#ffffff',
  accent_color text not null default '#f59e0b',
  heading_font text not null default 'Inter, sans-serif',
  body_font text not null default 'Inter, sans-serif',
  border_radius text not null default '1.5rem',
  shadow_style text not null default '0 24px 80px rgba(15, 23, 42, 0.08)',
  button_style text not null default 'rounded-2xl',
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

-- CMS pages and content
create table if not exists public.pages (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content jsonb,
  status text not null default 'draft',
  seo_title text,
  seo_description text,
  author_id uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create index if not exists idx_pages_status on public.pages(status);
create index if not exists idx_pages_slug on public.pages(slug);

-- Blog and news
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content jsonb,
  cover_url text,
  status text not null default 'draft',
  category_id uuid references public.categories(id) on delete set null,
  author_id uuid references public.profiles(id) on delete set null,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create index if not exists idx_posts_status on public.posts(status);
create index if not exists idx_posts_category_id on public.posts(category_id);

-- Donations and campaigns
create table if not exists public.campaigns (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  goal_amount numeric not null default 0,
  raised_amount numeric not null default 0,
  status text not null default 'active',
  start_date timestamptz not null default now(),
  end_date timestamptz,
  description text,
  cover_url text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create table if not exists public.donations (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid references public.campaigns(id) on delete set null,
  donor_name text not null,
  donor_email text not null,
  amount numeric not null default 0,
  currency text not null default 'USD',
  status text not null default 'pending',
  message text,
  processed_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create index if not exists idx_donations_campaign_id on public.donations(campaign_id);

-- Inventory management
create table if not exists public.inventory (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  sku text,
  category text,
  quantity integer not null default 0,
  status text not null default 'in_stock',
  location text,
  description text,
  owner_id uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create index if not exists idx_inventory_status on public.inventory(status);

-- Contacts and communication
create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  organization text,
  role text,
  source text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  title text not null,
  message text not null,
  category text,
  read boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid references public.profiles(id) on delete set null,
  recipient_id uuid references public.profiles(id) on delete set null,
  content text not null,
  read boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  assigned_to uuid references public.profiles(id) on delete set null,
  status text not null default 'todo',
  priority text not null default 'medium',
  due_date timestamptz,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create table if not exists public.files (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  url text not null,
  mime_type text,
  size integer,
  category text,
  uploaded_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create table if not exists public.analytics (
  id uuid primary key default gen_random_uuid(),
  metric text not null,
  value numeric not null default 0,
  details jsonb,
  recorded_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

-- Row-level security templates
alter table public.profiles enable row level security;
alter table public.settings enable row level security;
alter table public.theme_settings enable row level security;
alter table public.pages enable row level security;
alter table public.posts enable row level security;
alter table public.categories enable row level security;
alter table public.campaigns enable row level security;
alter table public.donations enable row level security;
alter table public.inventory enable row level security;
alter table public.contacts enable row level security;
alter table public.notifications enable row level security;
alter table public.messages enable row level security;
alter table public.tasks enable row level security;
alter table public.files enable row level security;
alter table public.analytics enable row level security;

-- Public policies for authenticated users
create policy if not exists "authenticated read access" on public.profiles
  for select using (auth.role() = 'authenticated');

create policy if not exists "authenticated read access" on public.settings
  for select using (auth.role() = 'authenticated');

create policy if not exists "authenticated read access" on public.theme_settings
  for select using (auth.role() = 'authenticated');

create policy if not exists "authenticated access" on public.pages
  for select using (auth.role() = 'authenticated');

create policy if not exists "authenticated access" on public.posts
  for select using (auth.role() = 'authenticated');

create policy if not exists "authenticated access" on public.categories
  for select using (auth.role() = 'authenticated');

create policy if not exists "authenticated access" on public.campaigns
  for select using (auth.role() = 'authenticated');

create policy if not exists "authenticated access" on public.donations
  for select using (auth.role() = 'authenticated');

create policy if not exists "authenticated access" on public.inventory
  for select using (auth.role() = 'authenticated');

create policy if not exists "authenticated access" on public.contacts
  for select using (auth.role() = 'authenticated');

create policy if not exists "authenticated access" on public.notifications
  for select using (auth.role() = 'authenticated');

create policy if not exists "authenticated access" on public.messages
  for select using (auth.role() = 'authenticated');

create policy if not exists "authenticated access" on public.tasks
  for select using (auth.role() = 'authenticated');

create policy if not exists "authenticated access" on public.files
  for select using (auth.role() = 'authenticated');

create policy if not exists "authenticated access" on public.analytics
  for select using (auth.role() = 'authenticated');
