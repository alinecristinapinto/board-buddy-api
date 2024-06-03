import { AddPenalty, UpdatePenalty } from './penalty.types';

export interface IPenaltyRepository {
  create(loan: AddPenalty): Promise<void>;
  update(loan: UpdatePenalty): Promise<void>;
}
