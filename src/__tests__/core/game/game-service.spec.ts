import { IGameRepository } from '../../../core/game/ports/game-repository.interface';
import { AddGame, Game } from '../../../core/game/ports/game.types';
import { GameServices } from '../../../core/game/usecases/game-services';
import { APIException } from '../../../core/helpers/api-exception';

describe('GameServices', () => {
  let gameServices: GameServices;
  let gameRepository: jest.Mocked<IGameRepository>;

  beforeEach(() => {
    gameRepository = {
      create: jest.fn(),
      update: jest.fn(),
      findById: jest.fn(),
      findByName: jest.fn(),
      findAll: jest.fn(),
    };

    gameServices = new GameServices(gameRepository);
  });

  describe('add', () => {
    it('adds a game successfully', async () => {
      const newGame: AddGame = {
        name: 'Test Game',
        description: 'Test Description',
        user_id: '123',
        available: true,
      };

      await gameServices.add(newGame);

      expect(gameRepository.create).toHaveBeenCalledWith(newGame);
    });

    it('throws an error if repository throws', async () => {
      const newGame: AddGame = {
        name: 'Test Game',
        description: 'Test Description',
        user_id: '123',
        available: true,
      };

      gameRepository.create.mockRejectedValue(new Error('Repository error'));

      await expect(gameServices.add(newGame)).rejects.toThrow('Repository error');
    });
  });

  describe('getDetails', () => {
    it('returns game details if game is found', async () => {
      const game: Game = {
        id: 1,
        name: 'Test Game',
        description: 'Test Description',
        user_id: '123',
        available: true,
      };

      gameRepository.findById.mockResolvedValue(game);

      const result = await gameServices.getDetails(1);

      expect(result).toEqual(game);
      expect(gameRepository.findById).toHaveBeenCalledWith(1);
    });

    it('throws an error if repository throws', async () => {
      gameRepository.findById.mockRejectedValue(new Error('Repository error'));

      await expect(gameServices.getDetails(1)).rejects.toThrow('Repository error');
    });
  });

  describe('getByName', () => {
    it('returns games by name', async () => {
      const games: Game[] = [
        { id: 1, name: 'Test Game', description: 'Test Description', user_id: '123', available: true },
      ];

      gameRepository.findByName.mockResolvedValue(games);

      const result = await gameServices.getByName('Test Game');

      expect(result).toEqual(games);
      expect(gameRepository.findByName).toHaveBeenCalledWith('Test Game');
    });

    it('should throw an error if repository throws', async () => {
      gameRepository.findByName.mockRejectedValue(new Error('Repository error'));

      await expect(gameServices.getByName('Test Game')).rejects.toThrow('Repository error');
    });
  });

  describe('getAll', () => {
    it('returns all games', async () => {
      const games: Game[] = [
        { id: 1, name: 'Test Game', description: 'Test Description', user_id: '123', available: true },
      ];

      gameRepository.findAll.mockResolvedValue(games);

      const result = await gameServices.getAll();

      expect(result).toEqual(games);
      expect(gameRepository.findAll).toHaveBeenCalled();
    });

    it('throws an error if repository throws', async () => {
      gameRepository.findAll.mockRejectedValue(new Error('Repository error'));

      await expect(gameServices.getAll()).rejects.toThrow('Repository error');
    });
  });
});
