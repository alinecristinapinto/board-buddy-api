import { APIException } from '../../helpers/api-exception';

import { IProfileRepository } from '../ports/profile-repository.interface';
import { FindProfile, Profile } from '../ports/profile.types';

export class ProfileServices {
  private repository: IProfileRepository;

  constructor(repository: IProfileRepository) {
    this.repository = repository;
  }

  public async getDetails({ id }: FindProfile): Promise<Profile> {
    try {
      const profile = await this.repository.findById(id);

      if (!profile) throw new APIException('User details not found', 404);

      return profile;
    } catch (error) {
      throw error;
    }
  }

  public async getAll(): Promise<Profile[]> {
    try {
      return await this.repository.findAll();
    } catch (error) {
      throw error;
    }
  }
}
