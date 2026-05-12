"use client";

import { createBrowserClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "./database.types";

export const createSupabaseBrowserClient = () =>
  createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  );
