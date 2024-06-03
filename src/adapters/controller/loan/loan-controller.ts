import { Controller, Route, Tags, Post, Put, Body, SuccessResponse, Security } from 'tsoa';

import { LoanRepository } from '../../db/postgresql-supabase/loan/loan-repository';

import { BorrowGame, DeliverLoan } from '../../../core/loan/ports/loan.types';
import { LoanServices } from '../../../core/loan/usecases/loan-services';
import { GameRepository } from '../../db/postgresql-supabase/game/game-repository';
import { PenaltyRepository } from '../../db/postgresql-supabase/penalty/penalty-repository';
import { ProfileRepository } from '../../db/postgresql-supabase/profile/profile-repository';

@Route('loans')
@Tags('Loan')
export class LoanController extends Controller {
  @SuccessResponse('201', 'Created')
  //   @Security('jwt')
  @Post('/create')
  public async create(@Body() body: BorrowGame): Promise<void> {
    this.setStatus(201);
    return new LoanServices(
      new LoanRepository(),
      new GameRepository(),
      new PenaltyRepository(),
      new ProfileRepository(),
    ).create(body);
  }

  @SuccessResponse('204', 'No Content')
  //   @Security('jwt')
  @Put('/deliver')
  public async deliver(@Body() body: DeliverLoan): Promise<void> {
    this.setStatus(204);
    return new LoanServices(
      new LoanRepository(),
      new GameRepository(),
      new PenaltyRepository(),
      new ProfileRepository(),
    ).deliver(body);
  }
}
