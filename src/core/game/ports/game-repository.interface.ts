import { Game } from './game.types';

export interface IGameRepository {
  create(game: Game): Promise<void>;
}
