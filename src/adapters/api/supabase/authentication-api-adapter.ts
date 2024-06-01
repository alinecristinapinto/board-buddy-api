import {
  PasswordReset,
  RequestPasswordReset,
  UserSignIn,
  UserSignUp,
} from '../../../core/authentication/ports/authentication.types';
import { supabase } from '../../helpers/supabase-client';

export class AuthenticationApiAdapter {
  signUp = async ({ email, password }: UserSignUp) => {
    await supabase().auth.signUp({
      email,
      password,
    });
  };

  signIn = async ({ email, password }: UserSignIn) => {
    const { data } = await supabase().auth.signInWithPassword({
      email,
      password,
    });

    return data;
  };

  requestPasswordReset = async ({ email }: RequestPasswordReset) => {
    await supabase().auth.resetPasswordForEmail(email);
  };

  resetPassword = async ({ password }: PasswordReset) => {
    await supabase().auth.updateUser({ password });
  };
}
