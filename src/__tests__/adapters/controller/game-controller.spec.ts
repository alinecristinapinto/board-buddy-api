import { GameController } from '../../../adapters/controller/game/game-controller';
import { GameServices } from '../../../core/game/usecases/game-services';
import { GameRepository } from '../../../adapters/db/postgresql-supabase/game/game-repository';
import { AddGame, Game } from '../../../core/game/ports/game.types';

jest.mock('../../../core/game/usecases/game-services');
jest.mock('../../../adapters/db/postgresql-supabase/game/game-repository');

describe('GameController', () => {
  let controller: GameController;
  let gameServicesMock: jest.Mocked<GameServices>;

  beforeEach(() => {
    gameServicesMock = new GameServices(new GameRepository()) as jest.Mocked<GameServices>;
    controller = new GameController();

    (GameServices as jest.Mock).mockReturnValue(gameServicesMock);
  });

  describe('add', () => {
    it('calls add on GameServices and set status to 201', async () => {
      const addGame: AddGame = {
        name: 'Test Game',
        description: 'Test Description',
        user_id: 'user-id',
        available: true,
      };
      gameServicesMock.add.mockResolvedValue(undefined);

      await expect(controller.add(addGame)).resolves.toBeUndefined();
      expect(gameServicesMock.add).toHaveBeenCalledWith(addGame);
      expect(controller.getStatus()).toBe(201);
    });

    it('throws an error if add on GameServices throws', async () => {
      const addGame: AddGame = {
        name: 'Test Game',
        description: 'Test Description',
        user_id: 'user-id',
        available: true,
      };
      const error = new Error('Add game failed');
      gameServicesMock.add.mockRejectedValue(error);

      await expect(controller.add(addGame)).rejects.toThrow('Add game failed');
      expect(gameServicesMock.add).toHaveBeenCalledWith(addGame);
    });
  });

  describe('getDetails', () => {
    it('calls getDetails on GameServices and set status to 200', async () => {
      const game: Game = {
        id: 1,
        name: 'Test Game',
        description: 'Test Description',
        user_id: 'user-id',
        available: true,
      };
      gameServicesMock.getDetails.mockResolvedValue(game);

      await expect(controller.getDetails(1)).resolves.toEqual(game);
      expect(gameServicesMock.getDetails).toHaveBeenCalledWith(1);
      expect(controller.getStatus()).toBe(200);
    });

    it('throws an error if getDetails on GameServices throws', async () => {
      const error = new Error('Get details failed');
      gameServicesMock.getDetails.mockRejectedValue(error);

      await expect(controller.getDetails(1)).rejects.toThrow('Get details failed');
      expect(gameServicesMock.getDetails).toHaveBeenCalledWith(1);
    });
  });

  describe('getAll', () => {
    it('calls getAll on GameServices and set status to 200', async () => {
      const games: Game[] = [
        { id: 1, name: 'Test Game 1', description: 'Test Description 1', user_id: 'user-id-1', available: true },
        { id: 2, name: 'Test Game 2', description: 'Test Description 2', user_id: 'user-id-2', available: true },
      ];
      gameServicesMock.getAll.mockResolvedValue(games);

      await expect(controller.getAll()).resolves.toEqual(games);
      expect(gameServicesMock.getAll).toHaveBeenCalled();
      expect(controller.getStatus()).toBe(200);
    });

    it('throws an error if getAll on GameServices throws', async () => {
      const error = new Error('Get all failed');
      gameServicesMock.getAll.mockRejectedValue(error);

      await expect(controller.getAll()).rejects.toThrow('Get all failed');
      expect(gameServicesMock.getAll).toHaveBeenCalled();
    });
  });

  describe('getByName', () => {
    it('calls getByName on GameServices and set status to 200', async () => {
      const games: Game[] = [
        { id: 1, name: 'Test Game', description: 'Test Description', user_id: 'user-id', available: true },
      ];
      gameServicesMock.getByName.mockResolvedValue(games);

      await expect(controller.getByName('Test Game')).resolves.toEqual(games);
      expect(gameServicesMock.getByName).toHaveBeenCalledWith('Test Game');
      expect(controller.getStatus()).toBe(200);
    });

    it('throws an error if getByName on GameServices throws', async () => {
      const error = new Error('Get by name failed');
      gameServicesMock.getByName.mockRejectedValue(error);

      await expect(controller.getByName('Test Game')).rejects.toThrow('Get by name failed');
      expect(gameServicesMock.getByName).toHaveBeenCalledWith('Test Game');
    });
  });
});
