export type Loan = {
  id: string;
  estimated_delivery: Date;
  delivered: Date;
  game_id: string
  lessee_user_id: string;
};
  
export type BorrowGame = Omit<Loan, 'id' | 'delivered'>;
export type ReturnGame = Loan;