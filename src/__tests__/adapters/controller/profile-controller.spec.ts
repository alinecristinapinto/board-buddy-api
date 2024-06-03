import { ProfileController } from '../../../adapters/controller/profile/profile-controller';
import { ProfileServices } from '../../../core/profile/usecases/profile-services';
import { ProfileRepository } from '../../../adapters/db/postgresql-supabase/profile/profile-repository';
import { Profile } from '../../../core/profile/ports/profile.types';

jest.mock('../../../core/profile/usecases/profile-services');
jest.mock('../../../adapters/db/postgresql-supabase/profile/profile-repository');

describe('ProfileController', () => {
  let controller: ProfileController;
  let profileServicesMock: jest.Mocked<ProfileServices>;

  beforeEach(() => {
    profileServicesMock = new ProfileServices(new ProfileRepository()) as jest.Mocked<ProfileServices>;
    controller = new ProfileController();

    (ProfileServices as jest.Mock).mockReturnValue(profileServicesMock);
  });

  describe('getAll', () => {
    it('calls getAll on ProfileServices and set status to 200', async () => {
      const profiles: Profile[] = [
        { id: '1', name: 'Profile 1', blocked: false },
        { id: '2', name: 'Profile 2', blocked: false },
      ];
      profileServicesMock.getAll.mockResolvedValue(profiles);

      await expect(controller.getAll()).resolves.toEqual(profiles);
      expect(profileServicesMock.getAll).toHaveBeenCalled();
      expect(controller.getStatus()).toBe(200);
    });

    it('throws an error if getAll on ProfileServices throws', async () => {
      const error = new Error('Get all profiles failed');
      profileServicesMock.getAll.mockRejectedValue(error);

      await expect(controller.getAll()).rejects.toThrow('Get all profiles failed');
      expect(profileServicesMock.getAll).toHaveBeenCalled();
    });
  });

  describe('getDetails', () => {
    it('calls getDetails on ProfileServices and set status to 200', async () => {
      const profile: Profile = { id: '1', name: 'Profile 1', blocked: false };
      profileServicesMock.getDetails.mockResolvedValue(profile);

      await expect(controller.getDetails('1')).resolves.toEqual(profile);
      expect(profileServicesMock.getDetails).toHaveBeenCalledWith({ id: '1' });
      expect(controller.getStatus()).toBe(200);
    });

    it('throws an error if getDetails on ProfileServices throws', async () => {
      const error = new Error('Get profile details failed');
      profileServicesMock.getDetails.mockRejectedValue(error);

      await expect(controller.getDetails('1')).rejects.toThrow('Get profile details failed');
      expect(profileServicesMock.getDetails).toHaveBeenCalledWith({ id: '1' });
    });
  });
});
