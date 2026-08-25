#!/usr/bin/env bash
#
# Admin operations against the Supabase database.
#
# The site itself uses the publishable key, which Row Level Security limits
# to reading approved comments and inserting new ones. Anything beyond that
# (adding books, approving comments, reading newsletter signups) needs the
# secret key, which bypasses RLS entirely.
#
# That key lives in .env.local, which is gitignored. It must never be pasted
# into a chat, a commit, or a file that ships to the browser.
#
# Setup:
#   1. cp .env.local.example .env.local
#   2. Paste your secret key into .env.local (Supabase dashboard ->
#      Project Settings -> API Keys -> secret key)
#
# Usage:
#   tools/db.sh books                      list every book
#   tools/db.sh add-book                   add a book (prompts for fields)
#   tools/db.sh pending                    list comments awaiting approval
#   tools/db.sh approve <comment-id>       publish a comment
#   tools/db.sh reject <comment-id>        delete a comment
#   tools/db.sh subscribers                list newsletter signups
#
# Schema changes (CREATE TABLE, ALTER, policies) are not possible over the
# REST API — use the Supabase dashboard SQL Editor for those.

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_FILE="$ROOT/.env.local"

cmd="${1:-help}"

# Usage needs no credentials, so print it before looking for .env.local.
if [[ "$cmd" == "help" || "$cmd" == "-h" || "$cmd" == "--help" ]]; then
    sed -n '3,26p' "${BASH_SOURCE[0]}" | sed 's/^# \{0,1\}//'
    exit 0
fi

if [[ ! -f "$ENV_FILE" ]]; then
    echo "error: $ENV_FILE not found." >&2
    echo "Copy .env.local.example to .env.local and add your secret key." >&2
    exit 1
fi

# shellcheck disable=SC1090
set -a; source "$ENV_FILE"; set +a

: "${SUPABASE_URL:?SUPABASE_URL missing from .env.local}"
: "${SUPABASE_SECRET_KEY:?SUPABASE_SECRET_KEY missing from .env.local}"

api() {
    local method="$1" path="$2"; shift 2
    curl -sS -X "$method" "${SUPABASE_URL}/rest/v1/${path}" \
        -H "apikey: ${SUPABASE_SECRET_KEY}" \
        -H "Authorization: Bearer ${SUPABASE_SECRET_KEY}" \
        -H "Content-Type: application/json" \
        "$@"
}

# Escape a value for embedding in a JSON string.
json_escape() {
    local s=${1//\\/\\\\}
    s=${s//\"/\\\"}
    s=${s//$'\n'/\\n}
    s=${s//$'\r'/}
    s=${s//$'\t'/\\t}
    printf '%s' "$s"
}

case "$cmd" in
    books)
        api GET "books?select=id,title,author,genre&order=genre,title"
        echo
        ;;

    add-book)
        read -rp "Title: "           title
        read -rp "Author: "          author
        read -rp "Genre: "           genre
        read -rp "Image path (e.g. images/foo.jpg): " image
        read -rp "Amazon URL (blank = search link): "  link
        read -rp "Description: "     description
        [[ -z "$link" ]] && link="https://amazon.com"

        payload=$(printf '{"title":"%s","author":"%s","genre":"%s","image_url":"%s","affiliate_link":"%s","description":"%s"}' \
            "$(json_escape "$title")" "$(json_escape "$author")" "$(json_escape "$genre")" \
            "$(json_escape "$image")" "$(json_escape "$link")" "$(json_escape "$description")")

        api POST "books" -H "Prefer: return=representation" -d "$payload"
        echo
        ;;

    pending)
        api GET "comments?approved=eq.false&select=id,article_slug,name,comment,created_at&order=created_at.desc"
        echo
        ;;

    approve)
        id="${2:?usage: db.sh approve <comment-id>}"
        api PATCH "comments?id=eq.${id}" -H "Prefer: return=representation" -d '{"approved":true}'
        echo
        ;;

    reject)
        id="${2:?usage: db.sh reject <comment-id>}"
        api DELETE "comments?id=eq.${id}"
        echo "deleted $id"
        ;;

    subscribers)
        api GET "newsletter_signups?select=email,created_at&order=created_at.desc"
        echo
        ;;

    *)
        echo "unknown command: $cmd" >&2
        echo "run 'tools/db.sh help' for usage" >&2
        exit 1
        ;;
esac
