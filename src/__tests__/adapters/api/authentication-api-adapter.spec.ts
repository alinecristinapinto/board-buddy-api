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

  afterAll(() => {
    jest.clearAllMocks();
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

      await adapter.signUp(userSignUp);

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

      const resultPromise = adapter.signUp(userSignUp);

      await expect(resultPromise).rejects.toThrow(APIException);
      await expect(resultPromise).rejects.toThrow('Sign up failed');
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

      const userSignInMock: UserSignIn = { email: 'test@example.com', password: 'password' };
      const resultPromise = adapter.signIn(userSignInMock);

      await expect(resultPromise).resolves.toEqual({
        user: { id: 'user-id', email: userSignInMock.email },
      });

      expect(mockSignIn).toHaveBeenCalledWith({
        email: userSignInMock.email,
        password: userSignInMock.password,
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
      const userSignInMock: UserSignIn = { email: 'test@example.com', password: 'password' };
      const resultPromise = adapter.signIn(userSignInMock);

      await expect(resultPromise).rejects.toThrow(APIException);
      await expect(resultPromise).rejects.toThrow('Sign in failed');

      expect(mockSignIn).toHaveBeenCalledWith({
        email: userSignInMock.email,
        password: userSignInMock.password,
      });
    });
  });
});
