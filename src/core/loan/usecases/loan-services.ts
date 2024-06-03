import { IGameRepository } from '../../game/ports/game-repository.interface';
import { APIException } from '../../helpers/api-exception';
import { ILoanRepository } from '../ports/loan-repository.interface';
import { BorrowGame, ReturnGame, ReturnGameRequest } from '../ports/loan.types';

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

  public async deliver({ id }: ReturnGameRequest): Promise<void> {
    try {
      const loan = await this.repository.findById(id);
      console.log(loan);

      const game = await this.gameRepository.findById(loan.game_id);
      const deliveredDate = new Date();

      // if (loan.estimated_delivery < deliveredDate) throw new APIException('Time to delivery exceed. A penaulty must be generated', 400);

      await this.repository.update({ ...loan, delivered_at: deliveredDate });
      console.log('Passou');

      await this.gameRepository.update({ ...game, available: true });
    } catch (error) {
      throw error;
    }
  }
}
