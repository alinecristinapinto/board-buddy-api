import { Controller, Route, Tags, Post, Body, SuccessResponse, Security } from 'tsoa';

import { LoanRepository } from '../../db/postgresql-supabase/loan/loan-repository';

import { BorrowGame } from '../../../core/loan/ports/loan.types';
import { LoanServices } from '../../../core/loan/usecases/loan-services';

@Route('loan')
@Tags('Loan')
export class LoanController extends Controller {
  @SuccessResponse('201', 'Created')
  //   @Security('jwt')
  @Post('/add')
  public async add(@Body() body: BorrowGame): Promise<void> {
    this.setStatus(201);
    return new LoanServices(new LoanRepository()).add(body);
  }
}
