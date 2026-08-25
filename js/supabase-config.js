// Supabase client setup. The key below is the publishable/anon key —
// safe to expose in client-side code; access is controlled by the
// Row Level Security policies in supabase/schema.sql, not by keeping
// this key secret.
const SUPABASE_URL = 'https://oprumtyxnwyddwnqxozx.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_mZRpQFJrWwO-3EVN10UVGQ_M67Vdqjf';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ---------------------------------------------------------------
// Site settings
// ---------------------------------------------------------------

// Your Amazon Associates tracking ID (looks like "yourname-20"). Leave it
// empty until you have one — book links still work, they just won't earn
// commission. Setting it here updates the links for every book at once.
const AMAZON_ASSOCIATE_TAG = '';

// Public base URL of the site. Used for canonical/Open Graph tags in the
// HTML; update those too (and sitemap.xml + robots.txt) if this changes.
const SITE_URL = 'https://afianwie.github.io/Your-next-read';
