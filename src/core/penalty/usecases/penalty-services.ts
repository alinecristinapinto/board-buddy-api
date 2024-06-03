import { APIException } from '../../helpers/api-exception';
import { IPenaltyRepository } from '../ports/penalty-repository.interface';
import { PayPenalty } from '../ports/penalty.types';

export class PenaltyServices {
  private repository: IPenaltyRepository;

  constructor(repository: IPenaltyRepository) {
    this.repository = repository;
  }

  public async pay({ loan_id }: PayPenalty): Promise<void> {
    try {
      const penalty = await this.repository.findById(loan_id);

      if (!penalty) throw new APIException('Penalty not found', 404);

      if (penalty.payed_at) throw new APIException('Penalty is already payed', 400);

      await this.repository.update({ loan_id: penalty.loan_id, payed_at: new Date() });
    } catch (error) {
      throw error;
    }
  }
}
