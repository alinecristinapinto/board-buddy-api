import { ILoanRepository } from '../../../../core/loan/ports/loan-repository.interface';

import { BorrowGame, Loan, ReturnGame } from '../../../../core/loan/ports/loan.types';

import { Database } from '../helpers/supabase-database';
import { supabase } from '../../../helpers/supabase-client';
import { APIException } from '../../../../core/helpers/api-exception';
import { format } from 'date-fns';

export class LoanRepository implements ILoanRepository {
  async create(loan: BorrowGame): Promise<void> {
    const { error } = await supabase<Database>().from('Loan').insert({
      game_id: loan.game_id,
      estimated_delivery_at: loan.estimated_delivery_at.toUTCString(),
      lessee_user_id: loan.lessee_user_id,
    });

    if (error) throw new APIException(`${error.code} - ${error.details} - ${error.message}`, 400);
  }

  async update(retGame: ReturnGame): Promise<void> {
    const { error } = await supabase<Database>()
      .from('Loan')
      .update({
        game_id: retGame.game_id,
        estimated_delivery_at: new Date(retGame.estimated_delivery_at).toUTCString(),
        lessee_user_id: retGame.lessee_user_id,
        delivered_at: retGame.delivered_at.toUTCString(),
      })
      .eq('id', retGame.id);

    if (error) throw new APIException(`${error.code} - ${error.details} - ${error.message}`, 400);
  }

  async findById(id: number): Promise<Loan> {
    const { data, error } = await supabase<Database>().from('Loan').select().eq('id', id).returns<Loan[]>().limit(1);

    if (error) throw new APIException(`${error.code} - ${error.details} - ${error.message}`, 400);

    return data[0];
  }
}
