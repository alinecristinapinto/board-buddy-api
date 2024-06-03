import { IPenaltyRepository } from '../../../core/penalty/ports/penalty-repository.interface';
import { IProfileRepository } from '../../../core/profile/ports/profile-repository.interface';
import { PenaltyServices } from '../../../core/penalty/usecases/penalty-services';
import { PayPenalty } from '../../../core/penalty/ports/penalty.types';
import { APIException } from '../../../core/helpers/api-exception';

describe('PenaltyServices', () => {
  let penaltyServices: PenaltyServices;
  let penaltyRepository: jest.Mocked<IPenaltyRepository>;
  let profileRepository: jest.Mocked<IProfileRepository>;

  beforeEach(() => {
    penaltyRepository = {
      findById: jest.fn(),
      update: jest.fn(),
      create: jest.fn(),
    };

    profileRepository = {
      findById: jest.fn(),
      update: jest.fn(),
      findAll: jest.fn(),
    };

    penaltyServices = new PenaltyServices(penaltyRepository, profileRepository);
  });

  describe('pay', () => {
    it('successfully pays a penalty and unblock profile', async () => {
      const penalty = {
        loan_id: 1,
        payed_at: undefined,
        created_at: new Date(),
      };

      const profile = {
        id: '123',
        name: 'user',
        blocked: true,
      };

      penaltyRepository.findById.mockResolvedValue(penalty);
      profileRepository.findById.mockResolvedValue(profile);

      const payPenalty: PayPenalty = { loan_id: 1, profile_id: '123' };

      await penaltyServices.pay(payPenalty);

      expect(penaltyRepository.findById).toHaveBeenCalledWith(1);
      expect(profileRepository.findById).toHaveBeenCalledWith('123');
      expect(penaltyRepository.update).toHaveBeenCalledWith({ loan_id: 1, payed_at: expect.any(Date) });
      expect(profileRepository.update).toHaveBeenCalledWith({ ...profile, blocked: false });
    });

    it('throws APIException if penalty is already paid', async () => {
      const penalty = {
        loan_id: 1,
        payed_at: new Date(),
        created_at: new Date(),
      };

      penaltyRepository.findById.mockResolvedValue(penalty);

      const payPenalty: PayPenalty = { loan_id: 1, profile_id: '123' };

      await expect(penaltyServices.pay(payPenalty)).rejects.toThrow(APIException);
      await expect(penaltyServices.pay(payPenalty)).rejects.toThrow('Penalty is already payed');
    });

    it('throws error if repository update fails', async () => {
      const penalty = {
        loan_id: 1,
        payed_at: undefined,
        created_at: new Date(),
      };

      const profile = {
        id: '123',
        name: 'user',
        blocked: true,
      };

      penaltyRepository.findById.mockResolvedValue(penalty);
      profileRepository.findById.mockResolvedValue(profile);
      penaltyRepository.update.mockRejectedValue(new Error('Repository update error'));

      const payPenalty: PayPenalty = { loan_id: 1, profile_id: '123' };

      await expect(penaltyServices.pay(payPenalty)).rejects.toThrow('Repository update error');
    });
  });
});
