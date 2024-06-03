import { LoanController } from '../../../adapters/controller/loan/loan-controller';
import { LoanServices } from '../../../core/loan/usecases/loan-services';
import { LoanRepository } from '../../../adapters/db/postgresql-supabase/loan/loan-repository';
import { GameRepository } from '../../../adapters/db/postgresql-supabase/game/game-repository';
import { PenaltyRepository } from '../../../adapters/db/postgresql-supabase/penalty/penalty-repository';
import { ProfileRepository } from '../../../adapters/db/postgresql-supabase/profile/profile-repository';
import { BorrowGame, DeliverLoan } from '../../../core/loan/ports/loan.types';

jest.mock('../../../core/loan/usecases/loan-services');
jest.mock('../../../adapters/db/postgresql-supabase/loan/loan-repository');
jest.mock('../../../adapters/db/postgresql-supabase/game/game-repository');
jest.mock('../../../adapters/db/postgresql-supabase/penalty/penalty-repository');
jest.mock('../../../adapters/db/postgresql-supabase/profile/profile-repository');

describe('LoanController', () => {
  let controller: LoanController;
  let loanServicesMock: jest.Mocked<LoanServices>;

  beforeEach(() => {
    loanServicesMock = new LoanServices(
      new LoanRepository(),
      new GameRepository(),
      new PenaltyRepository(),
      new ProfileRepository(),
    ) as jest.Mocked<LoanServices>;
    controller = new LoanController();

    (LoanServices as jest.Mock).mockReturnValue(loanServicesMock);
  });

  describe('create', () => {
    it('calls create on LoanServices and set status to 201', async () => {
      const borrowGame: BorrowGame = { game_id: 1, lessee_user_id: 'user-id', estimated_delivery_at: new Date() };
      loanServicesMock.create.mockResolvedValue(undefined);

      await expect(controller.create(borrowGame)).resolves.toBeUndefined();
      expect(loanServicesMock.create).toHaveBeenCalledWith(borrowGame);
      expect(controller.getStatus()).toBe(201);
    });

    it('throws an error if create on LoanServices throws', async () => {
      const borrowGame: BorrowGame = { game_id: 1, lessee_user_id: 'user-id', estimated_delivery_at: new Date() };
      const error = new Error('Create loan failed');
      loanServicesMock.create.mockRejectedValue(error);

      await expect(controller.create(borrowGame)).rejects.toThrow('Create loan failed');
      expect(loanServicesMock.create).toHaveBeenCalledWith(borrowGame);
    });
  });

  describe('deliver', () => {
    it('calls deliver on LoanServices and set status to 204', async () => {
      const deliverLoan: DeliverLoan = { id: 1 };
      loanServicesMock.deliver.mockResolvedValue(undefined);

      await expect(controller.deliver(deliverLoan)).resolves.toBeUndefined();
      expect(loanServicesMock.deliver).toHaveBeenCalledWith(deliverLoan);
      expect(controller.getStatus()).toBe(204);
    });

    it('throws an error if deliver on LoanServices throws', async () => {
      const deliverLoan: DeliverLoan = { id: 1 };
      const error = new Error('Deliver loan failed');
      loanServicesMock.deliver.mockRejectedValue(error);

      await expect(controller.deliver(deliverLoan)).rejects.toThrow('Deliver loan failed');
      expect(loanServicesMock.deliver).toHaveBeenCalledWith(deliverLoan);
    });
  });
});
