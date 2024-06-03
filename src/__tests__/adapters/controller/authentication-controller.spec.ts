import { AuthenticationController } from '../../../adapters/controller/authentication/authentication-controller';
import { AuthenticationApiAdapter } from '../../../adapters/api/supabase/authentication-api-adapter';
import { UserSignIn, UserSignUp, UserResponse } from '../../../core/authentication/ports/authentication.types';

jest.mock('../../../adapters/api/supabase/authentication-api-adapter');

describe('AuthenticationController', () => {
  let controller: AuthenticationController;
  let mockSignUp: jest.Mock;
  let mockSignIn: jest.Mock;

  beforeEach(() => {
    controller = new AuthenticationController();

    mockSignUp = jest.fn();
    mockSignIn = jest.fn();

    (AuthenticationApiAdapter as jest.Mock).mockImplementation(() => ({
      signUp: mockSignUp,
      signIn: mockSignIn,
    }));
  });

  describe('signUp', () => {
    it('calls signUp on AuthenticationApiAdapter and set status to 201', async () => {
      mockSignUp.mockResolvedValue(undefined);

      const userSignUp: UserSignUp = {
        email: 'test@example.com',
        password: 'password',
        name: 'Test User',
        blocked: false,
      };

      await expect(controller.signUp(userSignUp)).resolves.toBeUndefined();

      expect(mockSignUp).toHaveBeenCalledWith(userSignUp);
      expect(controller.getStatus()).toBe(201);
    });

    it('throws an error if signUp on AuthenticationApiAdapter throws', async () => {
      const error = new Error('Sign up failed');
      mockSignUp.mockRejectedValue(error);

      const userSignUp: UserSignUp = {
        email: 'test@example.com',
        password: 'password',
        name: 'Test User',
        blocked: false,
      };

      await expect(controller.signUp(userSignUp)).rejects.toThrow('Sign up failed');

      expect(mockSignUp).toHaveBeenCalledWith(userSignUp);
    });
  });

  describe('signIn', () => {
    it('calls signIn on AuthenticationApiAdapter and return UserResponse', async () => {
      const userResponse: UserResponse = {
        session: { access_token: 'token', user: { id: 'user-id', email: 'test@example.com' } },
      };
      mockSignIn.mockResolvedValue(userResponse);

      const userSignIn: UserSignIn = { email: 'test@example.com', password: 'password' };

      await expect(controller.signIn(userSignIn)).resolves.toEqual(userResponse);

      expect(mockSignIn).toHaveBeenCalledWith(userSignIn);
    });

    it('throws an error if signIn on AuthenticationApiAdapter throws', async () => {
      const error = new Error('Sign in failed');
      mockSignIn.mockRejectedValue(error);

      const userSignIn: UserSignIn = { email: 'test@example.com', password: 'password' };

      await expect(controller.signIn(userSignIn)).rejects.toThrow('Sign in failed');

      expect(mockSignIn).toHaveBeenCalledWith(userSignIn);
    });
  });
});
