import { ILoanRepository } from '../ports/loan-repository.interface';
import { BorrowGame } from '../ports/loan.types';

export class LoanServices {
  private repository: ILoanRepository;

  constructor(repository: ILoanRepository) {
    this.repository = repository;
  }

  public async add(loan: BorrowGame): Promise<void> {
    try {
      await this.repository.create(loan);
    } catch (error) {
      throw error;
    }
  }
}