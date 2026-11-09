-- Execute este arquivo no SQL Editor do seu projeto Supabase.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  order_nsu text not null unique,
  product_code text not null default 'notaup-matematica-enem',
  amount integer not null default 1990 check (amount = 1990),
  status text not null default 'pending' check (status in ('pending','paid','refunded','canceled')),
  checkout_url text,
  transaction_nsu text,
  invoice_slug text,
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  product_code text not null default 'notaup-matematica-enem',
  access_type text not null default 'lifetime' check (access_type = 'lifetime'),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  quiz_code text not null,
  score integer not null,
  total integer not null,
  answers jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.orders enable row level security;
alter table public.enrollments enable row level security;
alter table public.quiz_attempts enable row level security;

create policy "profiles_read_own" on public.profiles for select to authenticated using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles for insert to authenticated with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);

create policy "orders_read_own" on public.orders for select to authenticated using (auth.uid() = user_id);
create policy "enrollments_read_own" on public.enrollments for select to authenticated using (auth.uid() = user_id);

create policy "quiz_attempts_read_own" on public.quiz_attempts for select to authenticated using (auth.uid() = user_id);
create policy "quiz_attempts_insert_own" on public.quiz_attempts for insert to authenticated with check (auth.uid() = user_id);

-- O frontend não recebe permissão de inserir/alterar pedidos ou matrículas.
-- Somente as Netlify Functions com service_role podem confirmar pagamentos e liberar acesso.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
