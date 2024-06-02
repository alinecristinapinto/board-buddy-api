import { IGameRepository } from '../../game/ports/game-repository.interface';
import { APIException } from '../../helpers/api-exception';
import { ILoanRepository } from '../ports/loan-repository.interface';
import { BorrowGame } from '../ports/loan.types';

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
}
