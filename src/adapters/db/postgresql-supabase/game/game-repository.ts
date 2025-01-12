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
    const { data, error } = await supabase<Database>().from('game').select('*').eq('id', id).limit(1);

    if (error) throw new APIException(`${error.code} - ${error.details} - ${error.message}`, 400);

    if (!data || data.length === 0) {
      throw new APIException('Game not found', 404);
    }

    const game = data[0];

    return {
      id: game.id,
      name: game.name || '',
      description: game.description || '',
      available: game.available ?? false,
      user_id: game.user_id || '',
    };
  }

  async findByName(name: string): Promise<Game[]> {
    const { data, error } = await supabase<Database>().from('game').select('*').ilike('name', `%${name}%`);

    if (error) throw new APIException(`${error.code} - ${error.details} - ${error.message}`, 400);

    if (!data) return [];

    return data.map((item) => ({
      id: item.id,
      name: item.name || '',
      description: item.description || '',
      available: item.available ?? false,
      user_id: item.user_id || '',
    }));
  }

  async findAll(): Promise<Game[]> {
    const { data, error } = await supabase<Database>().from('game').select('*');

    if (error) throw new APIException(`${error.code} - ${error.details} - ${error.message}`, 400);

    return data.map((item) => ({
      id: item.id,
      name: item.name || '',
      description: item.description || '',
      available: item.available ?? false,
      user_id: item.user_id || '',
    }));
  }
}
