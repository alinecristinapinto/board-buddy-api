import { IGameRepository } from '../ports/game-repository.interface';
import { Game } from '../ports/game.types';

export class GameServices {
  private repository: IGameRepository;

  constructor(repository: IGameRepository) {
    this.repository = repository;
  }

  public async add(game: Game): Promise<void> {
    try {
      await this.repository.create(game);
    } catch (error) {
      throw error;
    }
  }
}
