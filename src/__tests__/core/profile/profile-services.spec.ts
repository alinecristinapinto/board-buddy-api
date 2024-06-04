import { ProfileServices } from '../../../core/profile/usecases/profile-services';
import { IProfileRepository } from '../../../core/profile/ports/profile-repository.interface';
import { APIException } from '../../../core/helpers/api-exception';
import { Profile } from '../../../core/profile//ports/profile.types';

describe('ProfileServices', () => {
  let profileRepository: jest.Mocked<IProfileRepository>;
  let profileServices: ProfileServices;

  beforeEach(() => {
    profileRepository = {
      update: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
    } as jest.Mocked<IProfileRepository>;

    profileServices = new ProfileServices(profileRepository);
  });

  describe('getDetails', () => {
    it('return profile details for a valid ID', async () => {
      const profile: Profile = { id: '1', name: 'John Doe', blocked: false };

      profileRepository.findById.mockResolvedValue(profile);

      const result = await profileServices.getDetails({ id: '1' });

      expect(profileRepository.findById).toHaveBeenCalledWith('1');
      expect(result).toEqual(profile);
    });
  });

  describe('getAll', () => {
    it('return all profiles', async () => {
      const profiles: Profile[] = [
        { id: '1', name: 'John Doe', blocked: false },
        { id: '2', name: 'Jane Smith', blocked: true },
      ];

      profileRepository.findAll.mockResolvedValue(profiles);

      const result = await profileServices.getAll();

      expect(profileRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual(profiles);
    });
  });
});
