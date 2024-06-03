import { AddPenalty, Penalty, UpdatePenalty } from './penalty.types';

export interface IPenaltyRepository {
  create(penalty: AddPenalty): Promise<void>;
  update(penalty: UpdatePenalty): Promise<void>;
  findById(loan_id: number): Promise<Penalty>;
}
