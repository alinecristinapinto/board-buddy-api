export type Loan = {
  id: string;
  estimated_delivery: Date;
  delivered_at: Date;
  game_id: number;
  lessee_user_id: string;
};

export type BorrowGame = Omit<Loan, 'id' | 'delivered_at'>;
export type ReturnGame = Loan;
