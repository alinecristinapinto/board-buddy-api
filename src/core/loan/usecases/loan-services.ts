import { isBefore } from 'date-fns';
import { IGameRepository } from '../../game/ports/game-repository.interface';
import { APIException } from '../../helpers/api-exception';
import { ILoanRepository } from '../ports/loan-repository.interface';
import { BorrowGame, DeliverLoan } from '../ports/loan.types';
import { IPenaltyRepository } from '../../penalty/ports/penalty-repository.interface';
import { IProfileRepository } from '../../profile/ports/profile-repository.interface';

export class LoanServices {
  private repository: ILoanRepository;
  private gameRepository: IGameRepository;
  private penaltyRepository: IPenaltyRepository;
  private profileRepository: IProfileRepository;

  constructor(
    repository: ILoanRepository,
    gameRepository: IGameRepository,
    penaltyRepository: IPenaltyRepository,
    profileRepository: IProfileRepository,
  ) {
    this.repository = repository;
    this.gameRepository = gameRepository;
    this.penaltyRepository = penaltyRepository;
    this.profileRepository = profileRepository;
  }

  public async create(loan: BorrowGame): Promise<void> {
    try {
      const profile = await this.profileRepository.findById(loan.lessee_user_id);
      if (profile.blocked) throw new APIException('User is blocked. Payment necessary to enable loans', 400);

      const game = await this.gameRepository.findById(loan.game_id);
      if (!game.available) throw new APIException('Game is not available', 400);

      await this.repository.create(loan);
      await this.gameRepository.update({ ...game, available: false });
    } catch (error) {
      throw error;
    }
  }

  public async deliver({ id }: DeliverLoan): Promise<void> {
    try {
      const loan = await this.repository.findById(id);
      if (loan.delivered_at) throw new APIException('Loan already delivered', 400);

      const profile = await this.profileRepository.findById(loan.lessee_user_id);
      const game = await this.gameRepository.findById(loan.game_id);
      const deliveredDate = new Date();

      if (isBefore(new Date(loan.estimated_delivery_at), deliveredDate)) {
        console.log('Time to delivery exceed. A penaulty must be generated');
        this.penaltyRepository.create({ loan_id: loan.id });
        this.profileRepository.update({ ...profile, blocked: true });
      }

      await this.repository.update({ ...loan, delivered_at: deliveredDate });
      await this.gameRepository.update({ ...game, available: true });
    } catch (error) {
      throw error;
    }
  }
}
