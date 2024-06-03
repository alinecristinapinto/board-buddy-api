export type Penalty = {
  loan_id: number;
  created_at: Date;
  payed_at: Date;
};

export type AddPenalty = Pick<Penalty, 'loan_id'>;
export type PayPenalty = Pick<Penalty, 'loan_id'> & { profile_id: string };
export type UpdatePenalty = Omit<Penalty, 'created_at'>;
