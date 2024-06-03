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
    const { data, error } = await supabase<Database>()
      .from('profile')
      .select()
      .eq('id', id)
      .returns<Profile[]>()
      .limit(1);

    if (error) throw new APIException(`${error.code} - ${error.details} - ${error.message}`, 400);

    return data[0];
  }

  async findAll(): Promise<Profile[]> {
    const { data, error } = await supabase<Database>().from('profile').select().returns<Profile[]>();

    if (error) throw new APIException(`${error.code} - ${error.details} - ${error.message}`, 400);

    return data;
  }
}
