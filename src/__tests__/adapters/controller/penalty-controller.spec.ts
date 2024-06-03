import { PenaltyController } from '../../../adapters/controller/penalty/penalty-controller';
import { PenaltyServices } from '../../../core/penalty/usecases/penalty-services';
import { PenaltyRepository } from '../../../adapters/db/postgresql-supabase/penalty/penalty-repository';
import { ProfileRepository } from '../../../adapters/db/postgresql-supabase/profile/profile-repository';
import { PayPenalty } from '../../../core/penalty/ports/penalty.types';

jest.mock('../../../core/penalty/usecases/penalty-services');
jest.mock('../../../adapters/db/postgresql-supabase/penalty/penalty-repository');
jest.mock('../../../adapters/db/postgresql-supabase/profile/profile-repository');

describe('PenaltyController', () => {
  let controller: PenaltyController;
  let penaltyServicesMock: jest.Mocked<PenaltyServices>;

  beforeEach(() => {
    penaltyServicesMock = new PenaltyServices(
      new PenaltyRepository(),
      new ProfileRepository(),
    ) as jest.Mocked<PenaltyServices>;
    controller = new PenaltyController();

    (PenaltyServices as jest.Mock).mockReturnValue(penaltyServicesMock);
  });

  describe('pay', () => {
    it('calls pay on PenaltyServices and set status to 204', async () => {
      const payPenalty: PayPenalty = { loan_id: 1, profile_id: 'profile-id' };
      penaltyServicesMock.pay.mockResolvedValue(undefined);

      await expect(controller.pay(payPenalty)).resolves.toBeUndefined();
      expect(penaltyServicesMock.pay).toHaveBeenCalledWith(payPenalty);
      expect(controller.getStatus()).toBe(204);
    });

    it('throws an error if pay on PenaltyServices throws', async () => {
      const payPenalty: PayPenalty = { loan_id: 1, profile_id: 'profile-id' };
      const error = new Error('Pay penalty failed');
      penaltyServicesMock.pay.mockRejectedValue(error);

      await expect(controller.pay(payPenalty)).rejects.toThrow('Pay penalty failed');
      expect(penaltyServicesMock.pay).toHaveBeenCalledWith(payPenalty);
    });
  });
});
