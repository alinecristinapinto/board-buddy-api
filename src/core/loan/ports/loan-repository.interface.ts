import { BorrowGame, Loan } from './loan.types';
import { ReturnGame } from './loan.types';

export interface ILoanRepository {
  create(loan: BorrowGame): Promise<void>;
  update(loan: ReturnGame): Promise<void>;
  findById(id: number): Promise<Loan>;
}
