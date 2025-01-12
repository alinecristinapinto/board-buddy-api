import { AuthenticationController } from '../../../../adapters/controller/authentication/authentication-controller';
import { supabase } from '../../../../adapters/helpers/supabase-client';
import { UserSignIn, UserSignUp } from '../../../../core/authentication/ports/authentication.types';

jest.mock('../../../../adapters/helpers/supabase-client');

describe('AuthenticationController - Integration Tests', () => {
  let controller: AuthenticationController;

  beforeEach(() => {
    controller = new AuthenticationController();
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  describe('when calling signUp', () => {
    it('creates the user account', async () => {
      (supabase as jest.Mock).mockReturnValue({
        auth: {
          signUp: jest.fn(async () => ({
            data: {},
            error: null,
          })),
        },
      });

      const userSignUp: UserSignUp = {
        email: 'test@example.com',
        password: 'password',
        name: 'Test User',
        blocked: false,
      };

      await controller.signUp(userSignUp);

      expect(controller.getStatus()).toBe(201);
    });

    describe('and an error happens', () => {
      it('returns an error to the client', async () => {
        (supabase as jest.Mock).mockReturnValue({
          auth: {
            signUp: jest.fn(async () => ({
              data: null,
              error: { message: 'Sign up failed', status: 400 },
            })),
          },
        });

        const userSignUp: UserSignUp = {
          email: 'test@example.com',
          password: 'password',
          name: 'Test User',
          blocked: false,
        };

        await expect(controller.signUp(userSignUp)).rejects.toThrow('Sign up failed');
        expect(controller.getStatus()).toBe(400);
      });
    });
  });

  describe('signIn', () => {
    it('signs in the user', async () => {
      (supabase as jest.Mock).mockReturnValue({
        auth: {
          signInWithPassword: jest.fn(async () => ({
            data: {
              session: {
                access_token: 'mock-access-token',
                user: { id: 'mock-user-id', email: 'test@example.com' },
              },
            },
            error: null,
          })),
        },
      });

      const userSignIn: UserSignIn = { email: 'test@example.com', password: 'password' };

      const response = await controller.signIn(userSignIn);

      expect(response).toEqual({
        session: {
          access_token: 'mock-access-token',
          user: { id: 'mock-user-id', email: 'test@example.com' },
        },
      });
      expect(controller.getStatus()).toBe(200);
    });

    describe('and an error happens', () => {
      it('returns an error to the client', async () => {
        (supabase as jest.Mock).mockReturnValue({
          auth: {
            signInWithPassword: jest.fn(async () => ({
              data: null,
              error: { message: 'Sign in failed', status: 401 },
            })),
          },
        });

        const userSignIn: UserSignIn = { email: 'test@example.com', password: 'password' };

        await expect(controller.signIn(userSignIn)).rejects.toThrow('Sign in failed');
        expect(controller.getStatus()).toBe(401);
      });
    });
  });
});
