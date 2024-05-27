import { supabase } from '../helpers/supabase-client';

export class AuthenticationApi {
  signUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: 'example@email.com',
      password: 'example-password',
    });
  };

  signIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'example@email.com',
      password: 'example-password',
    });
  };

  requestPasswordReset = async () => {
    await supabase.auth.resetPasswordForEmail('hello@example.com', {
      redirectTo: 'http://example.com/account/update-password',
    });
  };

  resetPassword = async () => {
    await supabase.auth.updateUser({ password: 'new_password' });
  };
}
