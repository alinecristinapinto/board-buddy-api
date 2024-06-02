import { GameServices } from './game-services'; // Adjust the import path
import { IGameRepository } from '../ports/game-repository.interface'; // Adjust the import path
import { AddGame } from '../ports/game.types'; // Adjust the import path

describe('GameServices', () => {
  let gameServices: GameServices;
  let gameRepository: jest.Mocked<IGameRepository>;

  beforeEach(() => {
    // Create a mock implementation of IGameRepository
    gameRepository = {
      create: jest.fn(),
    };

    // Instantiate the GameServices with the mocked repository
    gameServices = new GameServices(gameRepository);
  });

  it('should call the repository create method with the game data', async () => {
    const game: AddGame = { name: 'Test Game', description: 'Test Description', user_id: 'user123' };

    await gameServices.add(game);

    expect(gameRepository.create).toHaveBeenCalledWith(game);
  });

  it('should throw an error if repository create method throws an error', async () => {
    const game: AddGame = { name: 'Test Game', description: 'Test Description', user_id: 'user123' };
    const error = new Error('Repository Error');
    gameRepository.create.mockRejectedValue(error);

    await expect(gameServices.add(game)).rejects.toThrow('Repository Error');
  });
});
