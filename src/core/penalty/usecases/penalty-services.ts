import { APIException } from '../../helpers/api-exception';
import { IProfileRepository } from '../../profile/ports/profile-repository.interface';
import { IPenaltyRepository } from '../ports/penalty-repository.interface';
import { PayPenalty } from '../ports/penalty.types';

export class PenaltyServices {
  private repository: IPenaltyRepository;
  private profileRepository: IProfileRepository;

  constructor(repository: IPenaltyRepository, profileRepository: IProfileRepository) {
    this.repository = repository;
    this.profileRepository = profileRepository;
  }

  public async pay({ loan_id, profile_id }: PayPenalty): Promise<void> {
    try {
      const penalty = await this.repository.findById(loan_id);

      if (!penalty) throw new APIException('Penalty not found', 404);

      if (penalty.payed_at) throw new APIException('Penalty is already payed', 400);

      const profile = await this.profileRepository.findById(profile_id);

      await this.repository.update({ loan_id: penalty.loan_id, payed_at: new Date() });
      await this.profileRepository.update({ ...profile, blocked: false });
    } catch (error) {
      throw error;
    }
  }
}
