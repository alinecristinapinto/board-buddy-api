import { GameController } from '../../../../adapters/controller/game/game-controller';
import { supabase } from '../../../../adapters/helpers/supabase-client';
import { AddGame, Game } from '../../../../core/game/ports/game.types';

jest.mock('../../../../adapters/helpers/supabase-client');

describe('GameController - Integration Tests', () => {
  let controller: GameController;

  beforeEach(() => {
    controller = new GameController();
    jest.clearAllMocks();
  });

  describe('when calling add', () => {
    it('creates a new game', async () => {
      (supabase as jest.Mock).mockReturnValue({
        from: jest.fn().mockReturnValue({
          insert: jest.fn().mockResolvedValue({ data: null, error: null }),
        }),
      });

      const addGame: AddGame = {
        name: 'Test Game',
        description: 'Test Description',
        user_id: 'user-id',
        available: true,
      };

      await controller.add(addGame);

      expect(controller.getStatus()).toBe(201);
    });

    it('throws an error when Supabase fails during game creation', async () => {
      (supabase as jest.Mock).mockReturnValue({
        from: jest.fn().mockReturnValue({
          insert: jest.fn().mockResolvedValue({
            data: null,
            error: { message: 'Database insert failed', status: 400 },
          }),
        }),
      });

      const addGame: AddGame = {
        name: 'Test Game',
        description: 'Test Description',
        user_id: 'user-id',
        available: true,
      };

      await expect(controller.add(addGame)).rejects.toThrow('Database insert failed');
      expect(controller.getStatus()).toBe(400);
    });
  });

  describe('when calling getDetails', () => {
    it('returns game details for a valid id', async () => {
      const mockGame: Game = {
        id: 1,
        name: 'Test Game',
        description: 'Test Description',
        user_id: 'user-id',
        available: true,
      };

      (supabase as jest.Mock).mockReturnValue({
        from: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            eq: jest.fn().mockReturnValue({
              limit: jest.fn().mockResolvedValue({
                data: [mockGame],
                error: null,
              }),
            }),
          }),
        }),
      });

      const response = await controller.getDetails(1);

      expect(response).toEqual(mockGame);
      expect(controller.getStatus()).toBe(200);
    });

    it('throws an error when Supabase fails during fetching details', async () => {
      (supabase as jest.Mock).mockReturnValue({
        from: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            eq: jest.fn().mockReturnValue({
              limit: jest.fn().mockResolvedValue({
                data: null,
                error: { message: 'Database error', status: 400 },
              }),
            }),
          }),
        }),
      });

      await expect(controller.getDetails(1)).rejects.toThrow('Database error');
      expect(controller.getStatus()).toBe(400);
    });
  });

  describe('when calling getAll', () => {
    it('returns all games', async () => {
      const mockGames: Game[] = [
        {
          id: 1,
          name: 'Test Game 1',
          description: 'Desc 1',
          user_id: 'user-123',
          available: true,
        },
        {
          id: 2,
          name: 'Test Game 2',
          description: 'Desc 2',
          user_id: 'user-456',
          available: false,
        },
      ];

      (supabase as jest.Mock).mockReturnValue({
        from: jest.fn().mockReturnValue({
          select: jest.fn().mockResolvedValue({
            data: mockGames,
            error: null,
          }),
        }),
      });

      const response = await controller.getAll();

      expect(response).toEqual(mockGames);
      expect(controller.getStatus()).toBe(200);
    });

    it('throws an error when Supabase fails during fetching all games', async () => {
      (supabase as jest.Mock).mockReturnValue({
        from: jest.fn().mockReturnValue({
          select: jest.fn().mockResolvedValue({
            data: null,
            error: { message: 'Database error', status: 400 },
          }),
        }),
      });

      await expect(controller.getAll()).rejects.toThrow('Database error');
      expect(controller.getStatus()).toBe(400);
    });
  });

  describe('when calling getByName', () => {
    it('returns games matching the name', async () => {
      const mockGames: Game[] = [
        {
          id: 1,
          name: 'Test Game',
          description: 'Desc 1',
          user_id: 'user-123',
          available: true,
        },
      ];

      (supabase as jest.Mock).mockReturnValue({
        from: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            ilike: jest.fn().mockResolvedValue({
              data: mockGames,
              error: null,
            }),
          }),
        }),
      });

      const response = await controller.getByName('Test Game');

      expect(response).toEqual(mockGames);
      expect(controller.getStatus()).toBe(200);
    });

    it('throws an error when Supabase fails during fetching by name', async () => {
      (supabase as jest.Mock).mockReturnValue({
        from: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            ilike: jest.fn().mockResolvedValue({
              data: null,
              error: { message: 'Database error', status: 400 },
            }),
          }),
        }),
      });

      await expect(controller.getByName('Test Game')).rejects.toThrow('Database error');
      expect(controller.getStatus()).toBe(400);
    });
  });
});
