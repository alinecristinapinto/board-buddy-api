import { Database } from '../helpers/supabase-database';
import { supabase } from '../../../helpers/supabase-client';
import { APIException } from '../../../../core/helpers/api-exception';
import { IProfileRepository } from '../../../../core/profile/ports/profile-repository.interface';
import { Profile, UpdateProfile } from '../../../../core/profile/ports/profile.types';

export class ProfileRepository implements IProfileRepository {
  async update(profile: UpdateProfile): Promise<void> {
    const { error } = await supabase<Database>()
      .from('profile')
      .update({
        name: profile.name,
        blocked: profile.blocked,
      })
      .eq('id', profile.id);

    if (error) throw new APIException(`${error.code} - ${error.details} - ${error.message}`, 400);
  }

  async findById(id: string): Promise<Profile> {
    const { data, error } = await supabase<Database>().from('profile').select('*').eq('id', id).limit(1);

    if (error) throw new APIException(`${error.code} - ${error.details} - ${error.message}`, 400);

    if (!data || data.length === 0) {
      throw new APIException('User details not found', 404);
    }

    const profile = data[0];

    return {
      ...profile,
      name: profile.name ?? '',
      blocked: profile.blocked ?? false,
    };
  }

  async findAll(): Promise<Profile[]> {
    const { data, error } = await supabase<Database>().from('profile').select('*');

    if (error) throw new APIException(`${error.code} - ${error.details} - ${error.message}`, 400);

    if (!data) return [];

    return data.map((profile) => ({
      id: profile.id,
      name: profile.name ?? '',
      blocked: profile.blocked ?? false,
    }));
  }
}
