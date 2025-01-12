import { PenaltyController } from '../../../../adapters/controller/penalty/penalty-controller';
import { supabase } from '../../../../adapters/helpers/supabase-client';
import { PayPenalty } from '../../../../core/penalty/ports/penalty.types';

jest.mock('../../../../adapters/helpers/supabase-client');

describe('PenaltyController - Integration Tests', () => {
  let controller: PenaltyController;

  beforeEach(() => {
    controller = new PenaltyController();
    jest.clearAllMocks();
  });

  describe('when calling pay', () => {
    it('calls Supabase to update penalty and profile, and sets status to 204', async () => {
      const payPenalty: PayPenalty = { loan_id: 1, profile_id: 'profile-id' };

      (supabase as jest.Mock).mockReturnValue({
        from: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            eq: jest.fn().mockReturnValue({
              limit: jest.fn().mockResolvedValue({
                data: [{ loan_id: 1, payed_at: null }],
                error: null,
              }),
            }),
          }),
          update: jest.fn().mockReturnValue({
            eq: jest.fn().mockResolvedValue({
              data: null,
              error: null,
            }),
          }),
        }),
      });

      await controller.pay(payPenalty);

      expect(controller.getStatus()).toBe(204);
    });

    it('throws an error when Supabase fails during penalty update', async () => {
      const payPenalty: PayPenalty = { loan_id: 1, profile_id: 'profile-id' };

      (supabase as jest.Mock).mockReturnValue({
        from: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            eq: jest.fn().mockReturnValue({
              limit: jest.fn().mockResolvedValue({
                data: [{ loan_id: 1, created_at: '2023-01-01T00:00:00.000Z', payed_at: null }],
                error: null,
              }),
            }),
          }),
          update: jest.fn().mockReturnValue({
            eq: jest.fn().mockResolvedValue({
              data: null,
              error: { message: 'Database update failed - Invalid data', status: 400 },
            }),
          }),
        }),
      });

      await expect(controller.pay(payPenalty)).rejects.toThrow('Database update failed - Invalid data');
      expect(controller.getStatus()).toBe(400);
    });

    it('throws an error when penalty is already paid', async () => {
      const payPenalty: PayPenalty = { loan_id: 1, profile_id: 'profile-id' };

      (supabase as jest.Mock).mockReturnValue({
        from: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            eq: jest.fn().mockReturnValue({
              limit: jest.fn().mockResolvedValue({
                data: [{ loan_id: 1, payed_at: new Date() }],
                error: null,
              }),
            }),
          }),
        }),
      });

      await expect(controller.pay(payPenalty)).rejects.toThrow('Penalty is already payed');
      expect(controller.getStatus()).toBe(400);
    });

    it('throws an error when penalty does not exist', async () => {
      const payPenalty: PayPenalty = { loan_id: 1, profile_id: 'profile-id' };

      (supabase as jest.Mock).mockReturnValue({
        from: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            eq: jest.fn().mockReturnValue({
              limit: jest.fn().mockResolvedValue({
                data: [],
                error: null,
              }),
            }),
          }),
        }),
      });

      await expect(controller.pay(payPenalty)).rejects.toThrow('Penalty not found');
      expect(controller.getStatus()).toBe(404);
    });
  });
});
