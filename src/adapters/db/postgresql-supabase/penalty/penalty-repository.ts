import { Database } from '../helpers/supabase-database';
import { supabase } from '../../../helpers/supabase-client';
import { APIException } from '../../../../core/helpers/api-exception';

import { IPenaltyRepository } from '../../../../core/penalty/ports/penalty-repository.interface';
import { AddPenalty, UpdatePenalty } from '../../../../core/penalty/ports/penalty.types';

export class PenaltyRepository implements IPenaltyRepository {
  async create(penalty: AddPenalty): Promise<void> {
    const { error } = await supabase<Database>().from('Penalty').insert({
      loan_id: penalty.loan_id,
    });

    if (error) throw new APIException(`${error.code} - ${error.details} - ${error.message}`, 400);
  }

  async update(penalty: UpdatePenalty): Promise<void> {
    const { error } = await supabase<Database>()
      .from('Penalty')
      .update({
        payed_at: new Date(penalty.payed_at).toUTCString(),
      })
      .eq('loan_id', penalty.loan_id);

    if (error) throw new APIException(`${error.code} - ${error.details} - ${error.message}`, 400);
  }
}
