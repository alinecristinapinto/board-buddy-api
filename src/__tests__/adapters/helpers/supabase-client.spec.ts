import { createClient } from '@supabase/supabase-js';
import { supabase } from '../../../adapters/helpers/supabase-client';

jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(),
}));

describe('supabase', () => {
  const PUBLIC_SUPABASE_URL = 'https://xyzcompany.supabase.co';
  const PUBLIC_SUPABASE_ANON_KEY = 'public-anon-key';

  beforeEach(() => {
    process.env.PUBLIC_SUPABASE_URL = PUBLIC_SUPABASE_URL;
    process.env.PUBLIC_SUPABASE_ANON_KEY = PUBLIC_SUPABASE_ANON_KEY;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('throws an error if PUBLIC_SUPABASE_URL is not set', () => {
    delete process.env.PUBLIC_SUPABASE_URL;

    expect(() => supabase()).toThrow(
      'Env variables are not set. Make sure you have a .env file with PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY',
    );
  });

  it('throws an error if PUBLIC_SUPABASE_ANON_KEY is not set', () => {
    delete process.env.PUBLIC_SUPABASE_ANON_KEY;

    expect(() => supabase()).toThrow(
      'Env variables are not set. Make sure you have a .env file with PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY',
    );
  });

  it('creates a Supabase client without JWT', () => {
    const client = {};
    (createClient as jest.Mock).mockReturnValue(client);

    const result = supabase();

    expect(createClient).toHaveBeenCalledWith(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
    expect(result).toBe(client);
  });

  it('creates a Supabase client with JWT', () => {
    const jwt = 'jwt-token';
    const client = {};
    (createClient as jest.Mock).mockReturnValue(client);

    const result = supabase(jwt);

    expect(createClient).toHaveBeenCalledWith(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
      global: {
        headers: {
          Authorization: jwt,
        },
      },
    });
    expect(result).toBe(client);
  });
});
