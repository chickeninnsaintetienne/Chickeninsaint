-- 1. Confirm the bucket exists and its exact name/public flag
select id, name, public from storage.buckets;

-- 2. Confirm which policies currently exist on storage.objects
select policyname, cmd, roles, qual, with_check
from pg_policies
where tablename = 'objects' and schemaname = 'storage';
