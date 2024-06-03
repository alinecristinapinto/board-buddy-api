import { Controller, Route, Tags, Put, Body, SuccessResponse, Security } from 'tsoa';

import { PenaltyRepository } from '../../db/postgresql-supabase/penalty/penalty-repository';
import { PayPenalty } from '../../../core/penalty/ports/penalty.types';
import { PenaltyServices } from '../../../core/penalty/usecases/penalty-services';

@Route('penalties')
@Tags('Penalty')
export class PenaltyController extends Controller {
  @SuccessResponse('204', 'No Content')
  //   @Security('jwt')
  @Put('/pay')
  public async pay(@Body() body: PayPenalty): Promise<void> {
    this.setStatus(204);
    return new PenaltyServices(new PenaltyRepository()).pay(body);
  }
}
