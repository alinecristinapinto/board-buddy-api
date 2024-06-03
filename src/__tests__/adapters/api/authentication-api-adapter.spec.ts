import { AuthenticationApiAdapter } from '../../../adapters/api/supabase/authentication-api-adapter';
import { supabase } from '../../../adapters/helpers/supabase-client';
import { APIException } from '../../../core/helpers/api-exception';
import { UserSignIn, UserSignUp } from '../../../core/authentication/ports/authentication.types';

jest.mock('../../../adapters/helpers/supabase-client');

describe('AuthenticationApiAdapter', () => {
  let adapter: AuthenticationApiAdapter;

  beforeEach(() => {
    adapter = new AuthenticationApiAdapter();
  });

  describe('signUp', () => {
    it('signs up a user successfully', async () => {
      const mockSignUp = jest.fn().mockResolvedValue({ error: null });
      (supabase as jest.Mock).mockReturnValue({
        auth: { signUp: mockSignUp },
      });

      const userSignUp: UserSignUp = {
        email: 'test@example.com',
        password: 'password',
        name: 'Test User',
        blocked: false,
      };

      await expect(adapter.signUp(userSignUp)).resolves.not.toThrow();

      expect(mockSignUp).toHaveBeenCalledWith({
        email: userSignUp.email,
        password: userSignUp.password,
        options: {
          data: { name: userSignUp.name, blocked: false },
        },
      });
    });

    it('throws an APIException if signUp fails', async () => {
      const mockSignUp = jest.fn().mockResolvedValue({
        error: { message: 'Sign up failed', status: 400 },
      });
      (supabase as jest.Mock).mockReturnValue({
        auth: { signUp: mockSignUp },
      });

      const userSignUp: UserSignUp = {
        email: 'test@example.com',
        password: 'password',
        name: 'Test User',
        blocked: false,
      };

      await expect(adapter.signUp(userSignUp)).rejects.toThrow(APIException);
      await expect(adapter.signUp(userSignUp)).rejects.toThrow('Sign up failed');

      expect(mockSignUp).toHaveBeenCalledWith({
        email: userSignUp.email,
        password: userSignUp.password,
        options: {
          data: { name: userSignUp.name, blocked: false },
        },
      });
    });
  });

  describe('signIn', () => {
    it('signs in a user successfully', async () => {
      const mockSignIn = jest.fn().mockResolvedValue({
        data: { user: { id: 'user-id', email: 'test@example.com' } },
        error: null,
      });
      (supabase as jest.Mock).mockReturnValue({
        auth: { signInWithPassword: mockSignIn },
      });

      const userSignIn: UserSignIn = { email: 'test@example.com', password: 'password' };

      await expect(adapter.signIn(userSignIn)).resolves.toEqual({
        user: { id: 'user-id', email: 'test@example.com' },
      });

      expect(mockSignIn).toHaveBeenCalledWith({
        email: userSignIn.email,
        password: userSignIn.password,
      });
    });

    it('throws an APIException if signIn fails', async () => {
      const mockSignIn = jest.fn().mockResolvedValue({
        data: null,
        error: { message: 'Sign in failed', status: 400 },
      });
      (supabase as jest.Mock).mockReturnValue({
        auth: { signInWithPassword: mockSignIn },
      });

      const userSignIn: UserSignIn = { email: 'test@example.com', password: 'password' };

      await expect(adapter.signIn(userSignIn)).rejects.toThrow(APIException);
      await expect(adapter.signIn(userSignIn)).rejects.toThrow('Sign in failed');

      expect(mockSignIn).toHaveBeenCalledWith({
        email: userSignIn.email,
        password: userSignIn.password,
      });
    });
  });
});
