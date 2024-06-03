import { IGameRepository } from '../../../../core/game/ports/game-repository.interface';
import { AddGame, Game } from '../../../../core/game/ports/game.types';

import { Database } from '../helpers/supabase-database';
import { supabase } from '../../../helpers/supabase-client';
import { APIException } from '../../../../core/helpers/api-exception';

export class GameRepository implements IGameRepository {
  async create(game: AddGame): Promise<void> {
    const { error } = await supabase<Database>()
      .from('game')
      .insert({ name: game.name, description: game.description, available: true, user_id: game.user_id });

    if (error) throw new APIException(`${error.code} - ${error.details} - ${error.message}`, 400);
  }

  async update(game: Game): Promise<void> {
    const { error } = await supabase<Database>()
      .from('game')
      .update({ name: game.name, description: game.description, available: game.available, user_id: game.user_id })
      .eq('id', game.id);

    if (error) throw new APIException(`${error.code} - ${error.details} - ${error.message}`, 400);
  }

  async findById(id: number): Promise<Game> {
    const { data, error } = await supabase<Database>().from('game').select().eq('id', id).returns<Game[]>().limit(1);

    if (error) throw new APIException(`${error.code} - ${error.details} - ${error.message}`, 400);

    return data[0];
  }

  async findByName(name: string): Promise<Game[]> {
    const { data, error } = await supabase<Database>().from('game').select().eq('name', name).returns<Game[]>();

    if (error) throw new APIException(`${error.code} - ${error.details} - ${error.message}`, 400);

    return data;
  }

  async findAll(): Promise<Game[]> {
    const { data, error } = await supabase<Database>().from('game').select().returns<Game[]>();

    if (error) throw new APIException(`${error.code} - ${error.details} - ${error.message}`, 400);

    return data;
  }
}
