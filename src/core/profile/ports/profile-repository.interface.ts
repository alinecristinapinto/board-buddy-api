import { Profile, UpdateProfile } from './profile.types';

export interface IProfileRepository {
  update(profile: Partial<UpdateProfile>): Promise<void>;
  findById(id: string): Promise<Profile>;
  findAll(): Promise<Profile[]>;
}
