-- Enable extensions
create extension if not exists "pgcrypto";
create extension if not exists "postgis";
create extension if not exists "pg_trgm";

-- Enumerations
do $$
begin
  if not exists (select 1 from pg_type where typname = 'status') then
    create type public.status as enum ('draft', 'published', 'archived');
  end if;
  if not exists (select 1 from pg_type where typname = 'visibility') then
    create type public.visibility as enum ('visible', 'hidden');
  end if;
  if not exists (select 1 from pg_type where typname = 'conversation_status') then
    create type public.conversation_status as enum ('approved', 'pending', 'rejected', 'flagged');
  end if;
  if not exists (select 1 from pg_type where typname = 'user_role') then
    create type public.user_role as enum ('instance_admin', 'project_admin', 'author');
  end if;
end
$$;

-- Helper functions
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create or replace function public.soft_delete_instances()
returns trigger
language plpgsql
as $$
begin
  if new.deleted_at is not null and old.deleted_at is null then
    update public.projects
      set deleted_at = new.deleted_at
      where instance_id = new.id and deleted_at is null;
    update public.instance_memberships
      set deleted_at = new.deleted_at
      where instance_id = new.id and deleted_at is null;
    update public.notifications
      set deleted_at = new.deleted_at
      where instance_id = new.id and deleted_at is null;
    update public.media
      set deleted_at = new.deleted_at
      where instance_id = new.id and deleted_at is null;
  end if;
  return new;
end;
$$;

create or replace function public.soft_delete_projects()
returns trigger
language plpgsql
as $$
begin
  if new.deleted_at is not null and old.deleted_at is null then
    update public.locations
      set deleted_at = new.deleted_at
      where project_id = new.id and deleted_at is null;
    update public.exhibits
      set deleted_at = new.deleted_at
      where project_id = new.id and deleted_at is null;
    update public.explorations
      set deleted_at = new.deleted_at
      where project_id = new.id and deleted_at is null;
    update public.media
      set deleted_at = new.deleted_at
      where project_id = new.id and deleted_at is null;
    update public.conversations
      set deleted_at = new.deleted_at
      where project_id = new.id and deleted_at is null;
    update public.project_memberships
      set deleted_at = new.deleted_at
      where project_id = new.id and deleted_at is null;
  end if;
  return new;
end;
$$;

create or replace function public.has_instance_role(target_instance uuid, allowed_roles text[])
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.instance_memberships im
    where im.instance_id = target_instance
      and im.user_id = auth.uid()
      and im.role = any(allowed_roles)
      and im.banned = false
      and im.deleted_at is null
  );
$$;

create or replace function public.has_project_role(target_project uuid, allowed_roles text[])
returns boolean
language sql
stable
as $$
  select
    exists (
      select 1
      from public.project_memberships pm
      where pm.project_id = target_project
        and pm.user_id = auth.uid()
        and pm.role = any(allowed_roles)
        and pm.banned = false
        and pm.deleted_at is null
    )
    or exists (
      select 1
      from public.projects p
      join public.instance_memberships im
        on im.instance_id = p.instance_id
      where p.id = target_project
        and im.user_id = auth.uid()
        and im.role = any(allowed_roles)
        and im.banned = false
        and im.deleted_at is null
    );
$$;

-- Tables
create table if not exists public.instances (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  summary text,
  description text,
  settings jsonb not null default '{}'::jsonb,
  branding jsonb not null default '{}'::jsonb,
  created_by uuid not null references auth.users(id) on delete restrict,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  deleted_at timestamptz,
  constraint instances_slug_check check (char_length(slug) > 2)
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  instance_id uuid not null references public.instances(id) on delete cascade,
  name text not null,
  slug text not null,
  summary text,
  description text,
  status public.status not null default 'draft',
  visibility public.visibility not null default 'visible',
  map_config jsonb not null default '{}'::jsonb,
  created_by uuid references auth.users(id) on delete set null,
  published_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  deleted_at timestamptz,
  constraint projects_slug_unique unique (instance_id, slug)
);

create table if not exists public.locations (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  title text not null,
  slug text not null,
  status public.status not null default 'draft',
  visibility public.visibility not null default 'visible',
  geometry geometry(Point, 4326) not null,
  metadata jsonb not null default '{}'::jsonb,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  deleted_at timestamptz,
  constraint locations_slug_unique unique (project_id, slug)
);

create table if not exists public.exhibits (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  location_id uuid references public.locations(id) on delete set null,
  title text not null,
  slug text not null,
  status public.status not null default 'draft',
  visibility public.visibility not null default 'visible',
  summary text,
  body jsonb not null default '{}'::jsonb,
  order_index integer not null default 0,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  deleted_at timestamptz,
  constraint exhibits_slug_unique unique (project_id, slug)
);

create table if not exists public.explorations (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  title text not null,
  slug text not null,
  status public.status not null default 'draft',
  visibility public.visibility not null default 'visible',
  summary text,
  content jsonb not null default '{}'::jsonb,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  deleted_at timestamptz,
  constraint explorations_slug_unique unique (project_id, slug)
);

create table if not exists public.media (
  id uuid primary key default gen_random_uuid(),
  instance_id uuid not null references public.instances(id) on delete cascade,
  project_id uuid references public.projects(id) on delete cascade,
  name text not null,
  description text,
  storage_path text not null,
  mime_type text,
  media_kind text not null,
  file_size bigint,
  metadata jsonb not null default '{}'::jsonb,
  visibility public.visibility not null default 'visible',
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  deleted_at timestamptz,
  constraint media_path_unique unique (instance_id, storage_path)
);

create table if not exists public.users_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  bio text,
  locale text not null default 'en',
  timezone text,
  preferences jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  subject text not null,
  message text not null,
  status public.conversation_status not null default 'pending',
  created_by uuid references auth.users(id) on delete set null,
  assigned_to uuid references auth.users(id) on delete set null,
  approved_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  deleted_at timestamptz
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  instance_id uuid references public.instances(id) on delete cascade,
  project_id uuid references public.projects(id) on delete cascade,
  notification_type text not null,
  payload jsonb not null default '{}'::jsonb,
  read_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  deleted_at timestamptz
);

create table if not exists public.ban_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  instance_id uuid references public.instances(id) on delete cascade,
  project_id uuid references public.projects(id) on delete cascade,
  reason text not null,
  banned boolean not null default true,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  reversed_at timestamptz,
  metadata jsonb not null default '{}'::jsonb
);

create table if not exists public.instance_memberships (
  id uuid primary key default gen_random_uuid(),
  instance_id uuid not null references public.instances(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.user_role not null,
  banned boolean not null default false,
  banned_at timestamptz,
  banned_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  deleted_at timestamptz,
  constraint instance_memberships_unique unique (instance_id, user_id)
);

create table if not exists public.project_memberships (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.user_role not null,
  banned boolean not null default false,
  banned_at timestamptz,
  banned_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  deleted_at timestamptz,
  constraint project_memberships_unique unique (project_id, user_id)
);

-- Indexes
create index if not exists idx_instances_slug on public.instances using gin (slug gin_trgm_ops);
create index if not exists idx_projects_instance on public.projects(instance_id);
create index if not exists idx_projects_slug on public.projects using gin (slug gin_trgm_ops);
create index if not exists idx_locations_project on public.locations(project_id);
create index if not exists idx_locations_geom on public.locations using gist (geometry);
create index if not exists idx_exhibits_project on public.exhibits(project_id);
create index if not exists idx_explorations_project on public.explorations(project_id);
create index if not exists idx_media_project on public.media(project_id);
create index if not exists idx_media_visibility on public.media(visibility);
create index if not exists idx_conversations_project on public.conversations(project_id);
create index if not exists idx_notifications_user on public.notifications(user_id);
create index if not exists idx_instance_memberships_user on public.instance_memberships(user_id);
create index if not exists idx_project_memberships_user on public.project_memberships(user_id);

-- Triggers
create trigger set_instances_updated_at
  before update on public.instances
  for each row
  execute procedure public.touch_updated_at();

create trigger cascade_instances_soft_delete
  after update on public.instances
  for each row
  execute procedure public.soft_delete_instances();

create trigger set_projects_updated_at
  before update on public.projects
  for each row
  execute procedure public.touch_updated_at();

create trigger cascade_projects_soft_delete
  after update on public.projects
  for each row
  execute procedure public.soft_delete_projects();

create trigger set_locations_updated_at
  before update on public.locations
  for each row
  execute procedure public.touch_updated_at();

create trigger set_exhibits_updated_at
  before update on public.exhibits
  for each row
  execute procedure public.touch_updated_at();

create trigger set_explorations_updated_at
  before update on public.explorations
  for each row
  execute procedure public.touch_updated_at();

create trigger set_media_updated_at
  before update on public.media
  for each row
  execute procedure public.touch_updated_at();

create trigger set_users_profiles_updated_at
  before update on public.users_profiles
  for each row
  execute procedure public.touch_updated_at();

create trigger set_conversations_updated_at
  before update on public.conversations
  for each row
  execute procedure public.touch_updated_at();

create trigger set_notifications_updated_at
  before update on public.notifications
  for each row
  execute procedure public.touch_updated_at();

create trigger set_instance_memberships_updated_at
  before update on public.instance_memberships
  for each row
  execute procedure public.touch_updated_at();

create trigger set_project_memberships_updated_at
  before update on public.project_memberships
  for each row
  execute procedure public.touch_updated_at();

-- Row Level Security
alter table public.instances enable row level security;
alter table public.projects enable row level security;
alter table public.locations enable row level security;
alter table public.exhibits enable row level security;
alter table public.explorations enable row level security;
alter table public.media enable row level security;
alter table public.users_profiles enable row level security;
alter table public.conversations enable row level security;
alter table public.notifications enable row level security;
alter table public.ban_logs enable row level security;
alter table public.instance_memberships enable row level security;
alter table public.project_memberships enable row level security;

-- Policies
create policy "instances_select"
  on public.instances
  for select
  using (
    has_instance_role(id, array['instance_admin','project_admin','author'])
    or auth.uid() = created_by
  );

create policy "instances_update"
  on public.instances
  for update
  using (has_instance_role(id, array['instance_admin']))
  with check (has_instance_role(id, array['instance_admin']));

create policy "projects_select"
  on public.projects
  for select
  using (has_project_role(id, array['instance_admin','project_admin','author']));

create policy "projects_modify"
  on public.projects
  for all
  using (has_project_role(id, array['instance_admin','project_admin']))
  with check (has_project_role(id, array['instance_admin','project_admin']));

create policy "locations_select"
  on public.locations
  for select
  using (has_project_role(project_id, array['instance_admin','project_admin','author']));

create policy "locations_modify"
  on public.locations
  for all
  using (has_project_role(project_id, array['instance_admin','project_admin','author']))
  with check (has_project_role(project_id, array['instance_admin','project_admin','author']));

create policy "exhibits_select"
  on public.exhibits
  for select
  using (has_project_role(project_id, array['instance_admin','project_admin','author']));

create policy "exhibits_modify"
  on public.exhibits
  for all
  using (has_project_role(project_id, array['instance_admin','project_admin']))
  with check (has_project_role(project_id, array['instance_admin','project_admin']));

create policy "explorations_select"
  on public.explorations
  for select
  using (has_project_role(project_id, array['instance_admin','project_admin','author']));

create policy "explorations_modify"
  on public.explorations
  for all
  using (has_project_role(project_id, array['instance_admin','project_admin']))
  with check (has_project_role(project_id, array['instance_admin','project_admin']));

create policy "media_select"
  on public.media
  for select
  using (
    has_instance_role(instance_id, array['instance_admin','project_admin','author'])
    or (project_id is not null and has_project_role(project_id, array['instance_admin','project_admin','author']))
  );

create policy "media_modify"
  on public.media
  for all
  using (
    has_instance_role(instance_id, array['instance_admin','project_admin'])
    or (project_id is not null and has_project_role(project_id, array['instance_admin','project_admin']))
  )
  with check (
    has_instance_role(instance_id, array['instance_admin','project_admin'])
    or (project_id is not null and has_project_role(project_id, array['instance_admin','project_admin']))
  );

create policy "users_profiles_select"
  on public.users_profiles
  for select
  using (auth.uid() = user_id);

create policy "users_profiles_modify"
  on public.users_profiles
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "conversations_select"
  on public.conversations
  for select
  using (has_project_role(project_id, array['instance_admin','project_admin','author']));

create policy "conversations_modify"
  on public.conversations
  for all
  using (has_project_role(project_id, array['instance_admin','project_admin']))
  with check (has_project_role(project_id, array['instance_admin','project_admin','author']));

create policy "notifications_select"
  on public.notifications
  for select
  using (auth.uid() = user_id);

create policy "notifications_update"
  on public.notifications
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "ban_logs_select"
  on public.ban_logs
  for select
  using (
    (instance_id is not null and has_instance_role(instance_id, array['instance_admin']))
    or (project_id is not null and has_project_role(project_id, array['instance_admin','project_admin']))
  );

create policy "ban_logs_insert"
  on public.ban_logs
  for insert
  with check (
    (instance_id is not null and has_instance_role(instance_id, array['instance_admin']))
    or (project_id is not null and has_project_role(project_id, array['instance_admin','project_admin']))
  );

create policy "instance_memberships_select"
  on public.instance_memberships
  for select
  using (
    has_instance_role(instance_id, array['instance_admin','project_admin'])
    or auth.uid() = user_id
  );

create policy "instance_memberships_modify"
  on public.instance_memberships
  for all
  using (has_instance_role(instance_id, array['instance_admin']))
  with check (has_instance_role(instance_id, array['instance_admin']));

create policy "project_memberships_select"
  on public.project_memberships
  for select
  using (
    has_project_role(project_id, array['instance_admin','project_admin'])
    or auth.uid() = user_id
  );

create policy "project_memberships_modify"
  on public.project_memberships
  for all
  using (has_project_role(project_id, array['instance_admin','project_admin']))
  with check (has_project_role(project_id, array['instance_admin','project_admin']));

comment on table public.instances is 'Top-level organization container for museums or cultural institutions.';
comment on table public.projects is 'Authoring scope for a specific exhibition, theme, or collection.';
comment on table public.locations is 'Geospatial points of interest associated with a project.';
comment on table public.exhibits is 'Rich content experiences linked to a project and optionally a location.';
comment on table public.explorations is 'Narrative or guided experiences within a project.';
comment on table public.media is 'Managed media assets stored in Supabase storage.';
comment on table public.users_profiles is 'Extended profile data linked to Supabase auth users.';
comment on table public.conversations is 'Visitor or internal conversations requiring moderation.';
comment on table public.notifications is 'User-scoped notifications for alerts and updates.';
comment on table public.ban_logs is 'Audit trail for bans and reversals across instances or projects.';
comment on table public.instance_memberships is 'Role assignments for users at the instance level.';
comment on table public.project_memberships is 'Role assignments for users within a project.';

-- Storage buckets (private by default)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  (
    'images',
    'images',
    false,
    null,
    array['image/jpeg','image/png','image/webp','image/svg+xml']::text[]
  ),
  (
    'audio',
    'audio',
    false,
    null,
    array['audio/mpeg','audio/wav','audio/ogg','audio/webm','audio/flac']::text[]
  ),
  (
    'video',
    'video',
    false,
    null,
    array['video/mp4','video/webm','video/ogg','video/x-matroska']::text[]
  ),
  (
    'models',
    'models',
    false,
    null,
    array['model/gltf+json','model/stl','model/obj','model/vnd.usdz+zip','model/ply']::text[]
  ),
  (
    'docs',
    'docs',
    false,
    null,
    array['application/pdf']::text[]
  )
on conflict (id) do update
set
  name = excluded.name,
  public = excluded.public,
  allowed_mime_types = excluded.allowed_mime_types;
