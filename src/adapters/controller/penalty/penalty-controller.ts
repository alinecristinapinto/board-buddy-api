import { Controller, Route, Tags, Put, Body, SuccessResponse, Security } from 'tsoa';

import { PenaltyRepository } from '../../db/postgresql-supabase/penalty/penalty-repository';
import { PayPenalty } from '../../../core/penalty/ports/penalty.types';
import { PenaltyServices } from '../../../core/penalty/usecases/penalty-services';
import { ProfileRepository } from '../../db/postgresql-supabase/profile/profile-repository';
import { APIException } from '../../../core/helpers/api-exception';

@Route('penalties')
@Tags('Penalty')
export class PenaltyController extends Controller {
  @SuccessResponse('204', 'No Content')
  @Security('jwt')
  @Put('/pay')
  public async pay(@Body() body: PayPenalty): Promise<void> {
    try {
      this.setStatus(204);
      return await new PenaltyServices(new PenaltyRepository(), new ProfileRepository()).pay(body);
    } catch (error) {
      if (error instanceof APIException) {
        this.setStatus(error.status || 500);
      }
      throw error;
    }
  }
}
