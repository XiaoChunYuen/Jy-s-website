-- Fix CMS write permissions for the current client-side admin panel.
-- Run this in Supabase Dashboard -> SQL Editor.

do $$
declare
  table_name text;
  cms_tables text[] := array[
    'site_settings',
    'projects',
    'about_content',
    'resume_files',
    'resume_experience',
    'resume_education',
    'resume_skills',
    'services',
    'social_links',
    'case_studies'
  ];
begin
  foreach table_name in array cms_tables loop
    if to_regclass('public.' || table_name) is not null then
      execute format('alter table public.%I enable row level security', table_name);

      execute format('drop policy if exists "Allow public read access" on public.%I', table_name);
      execute format('drop policy if exists "Allow public insert" on public.%I', table_name);
      execute format('drop policy if exists "Allow public update" on public.%I', table_name);
      execute format('drop policy if exists "Allow public delete" on public.%I', table_name);

      execute format('create policy "Allow public read access" on public.%I for select to anon using (true)', table_name);
      execute format('create policy "Allow public insert" on public.%I for insert to anon with check (true)', table_name);
      execute format('create policy "Allow public update" on public.%I for update to anon using (true) with check (true)', table_name);
      execute format('create policy "Allow public delete" on public.%I for delete to anon using (true)', table_name);
    end if;
  end loop;
end $$;

insert into storage.buckets (id, name, public)
values
  ('hero-backgrounds', 'hero-backgrounds', true),
  ('portfolio-images', 'portfolio-images', true),
  ('about-photos', 'about-photos', true),
  ('resume-files', 'resume-files', true),
  ('case-study-images', 'case-study-images', true),
  ('avatars', 'avatars', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Allow public storage read" on storage.objects;
drop policy if exists "Allow public storage insert" on storage.objects;
drop policy if exists "Allow public storage update" on storage.objects;
drop policy if exists "Allow public storage delete" on storage.objects;

create policy "Allow public storage read"
on storage.objects
for select
to anon
using (bucket_id in (
  'hero-backgrounds',
  'portfolio-images',
  'about-photos',
  'resume-files',
  'case-study-images',
  'avatars'
));

create policy "Allow public storage insert"
on storage.objects
for insert
to anon
with check (bucket_id in (
  'hero-backgrounds',
  'portfolio-images',
  'about-photos',
  'resume-files',
  'case-study-images',
  'avatars'
));

create policy "Allow public storage update"
on storage.objects
for update
to anon
using (bucket_id in (
  'hero-backgrounds',
  'portfolio-images',
  'about-photos',
  'resume-files',
  'case-study-images',
  'avatars'
))
with check (bucket_id in (
  'hero-backgrounds',
  'portfolio-images',
  'about-photos',
  'resume-files',
  'case-study-images',
  'avatars'
));

create policy "Allow public storage delete"
on storage.objects
for delete
to anon
using (bucket_id in (
  'hero-backgrounds',
  'portfolio-images',
  'about-photos',
  'resume-files',
  'case-study-images',
  'avatars'
));
