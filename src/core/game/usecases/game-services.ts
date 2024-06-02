import { APIException } from '../../helpers/api-exception';
import { IGameRepository } from '../ports/game-repository.interface';
import { AddGame, Game } from '../ports/game.types';

export class GameServices {
  private repository: IGameRepository;

  constructor(repository: IGameRepository) {
    this.repository = repository;
  }

  public async add(game: AddGame): Promise<void> {
    try {
      await this.repository.create(game);
    } catch (error) {
      throw error;
    }
  }

  public async getDetails(id: number): Promise<Game> {
    try {
      const game = await this.repository.findById(id);

      if (!game) throw new APIException('Game not found', 404);

      return game;
    } catch (error) {
      throw error;
    }
  }

  public async getByName(name: string): Promise<Game[]> {
    try {
      return await this.repository.findByName(name);
    } catch (error) {
      throw error;
    }
  }

  public async getAll(): Promise<Game[]> {
    try {
      return await this.repository.findAll();
    } catch (error) {
      throw error;
    }
  }
}
