import { BorrowGame } from './loan.types';
import { ReturnGame } from './loan.types';

export interface ILoanRepository {
  create(loan: BorrowGame): Promise<void>;
}