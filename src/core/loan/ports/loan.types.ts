export type Loan = {
  id: number;
  estimated_delivery_at: Date;
  delivered_at: Date;
  game_id: number;
  lessee_user_id: string;
};

export type BorrowGame = Omit<Loan, 'id' | 'delivered_at'>;
export type ReturnGame = Loan;
export type ReturnGameRequest = Pick<Loan, 'id'>;
