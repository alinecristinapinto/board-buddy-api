import { AddGame } from './game.types';

export interface IGameRepository {
  create(game: AddGame): Promise<void>;
}
