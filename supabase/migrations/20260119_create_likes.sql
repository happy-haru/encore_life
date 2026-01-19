-- Create post_likes table
create table if not exists post_likes (
  user_id uuid references auth.users not null,
  post_id uuid references posts(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (user_id, post_id)
);

-- Enable RLS
alter table post_likes enable row level security;

-- Policy: Users can view all likes
create policy "Users can view all likes" 
on post_likes for select 
using (true);

-- Policy: Authenticated users can insert their own likes
create policy "Authenticated users can toggle likes" 
on post_likes for insert 
with check (auth.uid() = user_id);

-- Policy: Authenticated users can delete their own likes
create policy "Authenticated users can delete likes" 
on post_likes for delete 
using (auth.uid() = user_id);

-- Helper function to get like count (optional, but useful)
create or replace view post_likes_count as
select post_id, count(*) as count
from post_likes
group by post_id;
