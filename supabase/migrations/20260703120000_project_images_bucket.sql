
-- Storage bucket for admin-uploaded project photos
insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', true)
on conflict (id) do nothing;

create policy "Project images are publicly viewable"
on storage.objects for select
to public
using (bucket_id = 'project-images');

create policy "Admins can upload project images"
on storage.objects for insert
to authenticated
with check (bucket_id = 'project-images' and public.has_role(auth.uid(), 'admin'));

create policy "Admins can update project images"
on storage.objects for update
to authenticated
using (bucket_id = 'project-images' and public.has_role(auth.uid(), 'admin'));

create policy "Admins can delete project images"
on storage.objects for delete
to authenticated
using (bucket_id = 'project-images' and public.has_role(auth.uid(), 'admin'));
