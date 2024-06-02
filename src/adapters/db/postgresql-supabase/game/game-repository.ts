import { IGameRepository } from '../../../../core/game/ports/game-repository.interface';
import { Game } from '../../../../core/game/ports/game.types';

import { Database } from '../helpers/supabase-database';
import { supabase } from '../../../helpers/supabase-client';
import { APIException } from '../../../helpers/api-exception';

export class GameRepository implements IGameRepository {
  async create(game: Game): Promise<void> {
    const { error } = await supabase<Database>()
      .from('Game')
      .insert({ name: game.name, description: game.description, available: true, user_id: game.user_id });

    if (error) throw new APIException(error.message, 500);
  }
}
