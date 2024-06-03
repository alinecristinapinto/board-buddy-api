import { Database } from '../helpers/supabase-database';
import { supabase } from '../../../helpers/supabase-client';
import { APIException } from '../../../../core/helpers/api-exception';

import { IPenaltyRepository } from '../../../../core/penalty/ports/penalty-repository.interface';
import { AddPenalty, Penalty, UpdatePenalty } from '../../../../core/penalty/ports/penalty.types';

export class PenaltyRepository implements IPenaltyRepository {
  async create(penalty: AddPenalty): Promise<void> {
    const { error } = await supabase<Database>().from('penalty').insert({
      loan_id: penalty.loan_id,
    });

    if (error) throw new APIException(`${error.code} - ${error.details} - ${error.message}`, 400);
  }

  async update(penalty: UpdatePenalty): Promise<void> {
    const { error } = await supabase<Database>()
      .from('penalty')
      .update({
        payed_at: new Date(penalty.payed_at).toUTCString(),
      })
      .eq('loan_id', penalty.loan_id);

    if (error) throw new APIException(`${error.code} - ${error.details} - ${error.message}`, 400);
  }

  async findById(loan_id: number): Promise<Penalty> {
    const { data, error } = await supabase<Database>()
      .from('penalty')
      .select()
      .eq('loan_id', loan_id)
      .returns<Penalty[]>()
      .limit(1);

    if (error) throw new APIException(`${error.code} - ${error.details} - ${error.message}`, 400);

    return data[0];
  }
}
