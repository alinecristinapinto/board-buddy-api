import { LoanServices } from '../../../core/loan/usecases/loan-services';
import { ILoanRepository } from '../../../core/loan/ports/loan-repository.interface';
import { IGameRepository } from '../../../core/game/ports/game-repository.interface';
import { IPenaltyRepository } from '../../../core/penalty/ports/penalty-repository.interface';
import { IProfileRepository } from '../../../core/profile/ports/profile-repository.interface';
import { APIException } from '../../../core/helpers/api-exception';

jest.mock('date-fns', () => ({
  isBefore: jest.fn(),
}));

describe('LoanServices', () => {
  let loanRepository: jest.Mocked<ILoanRepository>;
  let gameRepository: jest.Mocked<IGameRepository>;
  let penaltyRepository: jest.Mocked<IPenaltyRepository>;
  let profileRepository: jest.Mocked<IProfileRepository>;
  let loanServices: LoanServices;

  beforeEach(() => {
    loanRepository = {
      create: jest.fn(),
      update: jest.fn(),
      findById: jest.fn(),
    } as jest.Mocked<ILoanRepository>;

    gameRepository = {
      create: jest.fn(),
      update: jest.fn(),
      findById: jest.fn(),
      findByName: jest.fn(),
      findAll: jest.fn(),
    } as jest.Mocked<IGameRepository>;

    penaltyRepository = {
      findById: jest.fn(),
      update: jest.fn(),
      create: jest.fn(),
    } as jest.Mocked<IPenaltyRepository>;

    profileRepository = {
      findById: jest.fn(),
      update: jest.fn(),
      findAll: jest.fn(),
    } as jest.Mocked<IProfileRepository>;

    loanServices = new LoanServices(loanRepository, gameRepository, penaltyRepository, profileRepository);
  });

  describe('create', () => {
    it('create a loan successfully', async () => {
      const loan = { estimated_delivery_at: new Date(), game_id: 1, lessee_user_id: 'user1' };
      const profile = {
        id: '123',
        name: 'user',
        blocked: false,
      };
      const game = {
        id: 1,
        name: 'Test Game',
        description: 'Test Description',
        user_id: '123',
        available: false,
      };

      profileRepository.findById.mockResolvedValue(profile);
      gameRepository.findById.mockResolvedValue(game);

      await loanServices.create(loan);

      expect(profileRepository.findById).toHaveBeenCalledWith('user1');
      expect(gameRepository.findById).toHaveBeenCalledWith(1);
      expect(loanRepository.create).toHaveBeenCalledWith(loan);
      expect(gameRepository.update).toHaveBeenCalledWith({ ...game, available: false });
    });

    it('throw an error if the user is blocked', async () => {
      const loan = { estimated_delivery_at: new Date(), game_id: 1, lessee_user_id: 'user1' };
      const profile = {
        id: '123',
        name: 'user',
        blocked: true,
      };

      profileRepository.findById.mockResolvedValue(profile);

      await expect(loanServices.create(loan)).rejects.toThrow(APIException);
      expect(loanRepository.create).not.toHaveBeenCalled();
    });

    it('throw an error if the game is not available', async () => {
      const loan = { estimated_delivery_at: new Date(), game_id: 1, lessee_user_id: 'user1' };
      const profile = {
        id: '123',
        name: 'user',
        blocked: false,
      };
      const game = {
        id: 1,
        name: 'Test Game',
        description: 'Test Description',
        user_id: '123',
        available: true,
      };

      profileRepository.findById.mockResolvedValue(profile);
      gameRepository.findById.mockResolvedValue(game);

      await expect(loanServices.create(loan)).rejects.toThrow(APIException);
      expect(loanRepository.create).not.toHaveBeenCalled();
    });
  });
});
