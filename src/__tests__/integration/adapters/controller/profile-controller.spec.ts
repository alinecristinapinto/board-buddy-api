import { ProfileController } from '../../../../adapters/controller/profile/profile-controller';
import { supabase } from '../../../../adapters/helpers/supabase-client';

jest.mock('../../../../adapters/helpers/supabase-client');

describe('ProfileController - Integration Tests', () => {
  let controller: ProfileController;

  beforeEach(() => {
    controller = new ProfileController();
    jest.clearAllMocks();
  });

  describe('when calling getAll', () => {
    it('returns a list of profiles', async () => {
      (supabase as jest.Mock).mockReturnValue({
        from: jest.fn().mockReturnValue({
          select: jest.fn().mockResolvedValue({
            data: [
              { id: '1', name: 'John Doe', blocked: false },
              { id: '2', name: 'Jane Doe', blocked: true },
            ],
            error: null,
          }),
        }),
      });

      const response = await controller.getAll();

      expect(response).toEqual([
        { id: '1', name: 'John Doe', blocked: false },
        { id: '2', name: 'Jane Doe', blocked: true },
      ]);
      expect(controller.getStatus()).toBe(200);
    });

    it('throws an error when Supabase fails', async () => {
      (supabase as jest.Mock).mockReturnValue({
        from: jest.fn().mockReturnValue({
          select: jest.fn().mockResolvedValue({
            data: null,
            error: { message: 'Database error - Invalid arguments', status: 400 },
          }),
        }),
      });

      await expect(controller.getAll()).rejects.toThrow('Database error - Invalid arguments');
      expect(controller.getStatus()).toBe(400);
    });
  });

  describe('when calling getDetails', () => {
    it('returns profile details for a valid id', async () => {
      (supabase as jest.Mock).mockReturnValue({
        from: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            eq: jest.fn().mockReturnValue({
              limit: jest.fn().mockResolvedValue({
                data: [{ id: '1', name: 'John Doe', blocked: false }],
                error: null,
              }),
            }),
          }),
        }),
      });

      const response = await controller.getDetails('1');

      expect(response).toEqual({ id: '1', name: 'John Doe', blocked: false });
      expect(controller.getStatus()).toBe(200);
    });

    it('throws 404 error when profile is not found', async () => {
      (supabase as jest.Mock).mockReturnValue({
        from: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            eq: jest.fn().mockReturnValue({
              limit: jest.fn().mockResolvedValue({
                data: [],
                error: null,
              }),
            }),
          }),
        }),
      });

      await expect(controller.getDetails('invalid-id')).rejects.toThrow('User details not found');
      expect(controller.getStatus()).toBe(404);
    });

    it('throws a generic error when Supabase fails', async () => {
      (supabase as jest.Mock).mockReturnValue({
        from: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            eq: jest.fn().mockReturnValue({
              limit: jest.fn().mockResolvedValue({
                data: null,
                error: { message: 'Database error - Invalid arguments', status: 400 },
              }),
            }),
          }),
        }),
      });

      await expect(controller.getDetails('1')).rejects.toThrow('Database error - Invalid arguments');
      expect(controller.getStatus()).toBe(400);
    });
  });
});
