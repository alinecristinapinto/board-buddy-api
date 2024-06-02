import { AddGame, Game } from './game.types';

export interface IGameRepository {
  create(game: AddGame): Promise<void>;
  update(game: Game): Promise<void>;
  findById(id: number): Promise<Game>;
  findByName(name: string): Promise<Game[]>;
  findAll(): Promise<Game[]>;
}
