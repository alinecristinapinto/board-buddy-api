import { IGameRepository } from '../../../../core/game/ports/game-repository.interface';
import { AddGame } from '../../../../core/game/ports/game.types';

import { Database } from '../helpers/supabase-database';
import { supabase } from '../../../helpers/supabase-client';
import { APIException } from '../../../../core/helpers/api-exception';

export class GameRepository implements IGameRepository {
  async create(game: AddGame): Promise<void> {
    const { error } = await supabase<Database>()
      .from('Game')
      .insert({ name: game.name, description: game.description, available: true, user_id: game.user_id });

    if (error) throw new APIException(`${error.code} - ${error.details} - ${error.message}`, 400);
  }
}
