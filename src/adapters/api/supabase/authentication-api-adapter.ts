import { UserResponse, UserSignIn, UserSignUp } from '../../../core/authentication/ports/authentication.types';
import { supabase } from '../../helpers/supabase-client';
import { APIException, StatusCode } from '../../../core/helpers/api-exception';

export class AuthenticationApiAdapter {
  signUp = async ({ email, password, name }: UserSignUp) => {
    const { error } = await supabase().auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          blocked: false,
        },
      },
    });

    if (error) throw new APIException(error.message, (error.status as StatusCode) ?? 500);
  };

  signIn = async ({ email, password }: UserSignIn): Promise<UserResponse> => {
    const { data, error } = await supabase().auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new APIException(error.message, (error.status as StatusCode) ?? 500);

    return data;
  };
}
