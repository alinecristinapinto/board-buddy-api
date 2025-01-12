import { ProfileController } from '../../../../adapters/controller/profile/profile-controller';
import { ProfileServices } from '../../../../core/profile/usecases/profile-services';
import { ProfileRepository } from '../../../../adapters/db/postgresql-supabase/profile/profile-repository';
import { Profile } from '../../../../core/profile/ports/profile.types';
import { APIException } from '../../../../core/helpers/api-exception';

jest.mock('../../../../adapters/db/postgresql-supabase/profile/profile-repository');
jest.mock('../../../../core/profile/usecases/profile-services');

describe('ProfileController - Integration Tests', () => {
  let controller: ProfileController;
  let mockRepository: jest.Mocked<ProfileRepository>;
  let mockService: jest.Mocked<ProfileServices>;

  beforeEach(() => {
    mockRepository = new ProfileRepository() as jest.Mocked<ProfileRepository>;
    mockService = new ProfileServices(mockRepository) as jest.Mocked<ProfileServices>;

    jest.spyOn(ProfileServices.prototype, 'getAll').mockImplementation(mockService.getAll);
    jest.spyOn(ProfileServices.prototype, 'getDetails').mockImplementation(mockService.getDetails);

    controller = new ProfileController();
    jest.clearAllMocks();
  });

  describe('when calling getAll', () => {
    it('returns a list of profiles', async () => {
      const mockProfiles: Profile[] = [
        { id: '1', name: 'John Doe', blocked: false },
        { id: '2', name: 'Jane Doe', blocked: true },
      ];
      mockService.getAll.mockResolvedValue(mockProfiles);

      const response = await controller.getAll();

      expect(response).toEqual(mockProfiles);
      expect(controller.getStatus()).toBe(200);
    });

    it('throws an error when repository fails', async () => {
      mockService.getAll.mockRejectedValue(new APIException('Database error', 500));

      await expect(controller.getAll()).rejects.toThrow('Database error');
      expect(controller.getStatus()).toBe(500);
    });
  });

  describe('when calling getDetails', () => {
    it('returns profile details for a valid id', async () => {
      const mockProfile: Profile = { id: '1', name: 'John Doe', blocked: false };
      mockService.getDetails.mockResolvedValue(mockProfile);

      const response = await controller.getDetails('1');

      expect(response).toEqual(mockProfile);
      expect(controller.getStatus()).toBe(200);
    });

    it('throws 404 error when profile is not found', async () => {
      mockService.getDetails.mockRejectedValue(new APIException('User details not found', 404));

      await expect(controller.getDetails('invalid-id')).rejects.toThrow('User details not found');
      expect(controller.getStatus()).toBe(404);
    });

    it('throws a generic error when repository fails', async () => {
      mockService.getDetails.mockRejectedValue(new APIException('Database error', 500));

      await expect(controller.getDetails('1')).rejects.toThrow('Database error');
      expect(controller.getStatus()).toBe(500);
    });
  });
});
