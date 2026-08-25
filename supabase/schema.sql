-- Your Next Read — Supabase schema
-- Run this in the Supabase dashboard: SQL Editor → New Query → paste → Run.

-- ============================================================
-- books: single source of truth for the catalog shown on
-- books.html and used to pick the Book of the Week.
-- ============================================================
create table if not exists books (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    author text not null,
    image_url text not null,
    description text not null,
    genre text not null,
    affiliate_link text not null,
    created_at timestamptz not null default now()
);

alter table books enable row level security;

create policy "Anyone can read books"
    on books for select
    using (true);
-- No insert/update/delete policy for the anon role: catalog edits
-- happen from the Supabase Table Editor (or with the service_role key),
-- never from the public site.


-- ============================================================
-- comments: replaces the localStorage comment system, which
-- only showed each visitor their own comments. Comments are
-- moderated: they're invisible to other readers until approved.
-- ============================================================
create table if not exists comments (
    id uuid primary key default gen_random_uuid(),
    article_slug text not null,
    name text not null,
    comment text not null,
    approved boolean not null default false,
    created_at timestamptz not null default now()
);

create index if not exists comments_article_slug_idx on comments (article_slug);

alter table comments enable row level security;

create policy "Anyone can read approved comments"
    on comments for select
    using (approved = true);

create policy "Anyone can submit a comment"
    on comments for insert
    with check (
        char_length(name) between 1 and 80
        and char_length(comment) between 1 and 2000
    );
-- No update/delete policy for anon: approving a comment is done
-- from the Table Editor by flipping `approved` to true.


-- ============================================================
-- book_of_week: curated weekly pick, replacing the per-browser
-- random localStorage pick so every visitor sees the same book.
-- Add one row per week from the Table Editor; admin_note is the
-- "Why This Book?" blurb already used in the UI.
-- ============================================================
create table if not exists book_of_week (
    id uuid primary key default gen_random_uuid(),
    book_id uuid not null references books(id) on delete cascade,
    week_start date not null unique,
    admin_note text not null,
    created_at timestamptz not null default now()
);

alter table book_of_week enable row level security;

create policy "Anyone can read book of the week"
    on book_of_week for select
    using (true);


-- ============================================================
-- newsletter_signups: email capture. Insert-only for anon —
-- nobody can list or scrape the email addresses via the API.
-- ============================================================
create table if not exists newsletter_signups (
    id uuid primary key default gen_random_uuid(),
    email text not null unique,
    created_at timestamptz not null default now()
);

alter table newsletter_signups enable row level security;

create policy "Anyone can sign up"
    on newsletter_signups for insert
    with check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$');
-- No select policy: signups are only readable from the Supabase
-- dashboard (or with the service_role key), never from the public site.
