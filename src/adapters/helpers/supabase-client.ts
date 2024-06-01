import { createClient } from '@supabase/supabase-js';

export const supabase = (jwt?: string) => {
  if (!process.env.PUBLIC_SUPABASE_URL || !process.env.PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error(
      'Env variables are not set. Make sure you have a .env file with PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY',
    );
  }

  if (jwt) {
    return createClient(process.env.PUBLIC_SUPABASE_URL, process.env.PUBLIC_SUPABASE_ANON_KEY, {
      global: {
        headers: {
          Authorization: jwt,
        },
      },
    });
  }

  return createClient(process.env.PUBLIC_SUPABASE_URL, process.env.PUBLIC_SUPABASE_ANON_KEY);
};
