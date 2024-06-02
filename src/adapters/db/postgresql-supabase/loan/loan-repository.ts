import { ILoanRepository } from '../../../../core/loan/ports/loan-repository.interface';

import { BorrowGame } from '../../../../core/loan/ports/loan.types';

import { Database } from '../helpers/supabase-database';
import { supabase } from '../../../helpers/supabase-client';
import { APIException } from '../../../../core/helpers/api-exception';

export class LoanRepository implements ILoanRepository {
  async create(loan: BorrowGame): Promise<void> {
    const { error } = await supabase<Database>().from('Loan').insert({
      game_id: loan.game_id,
      estimated_delivery_at: loan.estimated_delivery.toUTCString(),
      lessee_user_id: loan.lessee_user_id,
    });

    if (error) throw new APIException(`${error.code} - ${error.details} - ${error.message}`, 400);
  }
}
