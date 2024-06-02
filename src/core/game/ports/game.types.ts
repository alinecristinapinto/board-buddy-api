export type Game = {
  id: number;
  name: string;
  description: string;
  user_id: string;
};

export type AddGame = Omit<Game, 'id'>;
