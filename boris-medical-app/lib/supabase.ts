import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  throw new Error(
    "SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set. " +
      "These are provided by the main Boris Medical App; this package is a drop-in.",
  );
}

export const supabase = createClient(url, key, {
  auth: { persistSession: false },
});
