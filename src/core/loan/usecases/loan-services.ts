import { isBefore } from 'date-fns';
import { IGameRepository } from '../../game/ports/game-repository.interface';
import { APIException } from '../../helpers/api-exception';
import { ILoanRepository } from '../ports/loan-repository.interface';
import { BorrowGame, DeliverLoan } from '../ports/loan.types';

export class LoanServices {
  private repository: ILoanRepository;
  private gameRepository: IGameRepository;

  constructor(repository: ILoanRepository, gameRepository: IGameRepository) {
    this.repository = repository;
    this.gameRepository = gameRepository;
  }

  public async create(loan: BorrowGame): Promise<void> {
    try {
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

      const game = await this.gameRepository.findById(loan.game_id);
      const deliveredDate = new Date();

      // Call penalty repository
      if (isBefore(loan.estimated_delivery_at, deliveredDate))
        console.log('Time to delivery exceed. A penaulty must be generated');

      await this.repository.update({ ...loan, delivered_at: deliveredDate });
      await this.gameRepository.update({ ...game, available: true });
    } catch (error) {
      throw error;
    }
  }
}
