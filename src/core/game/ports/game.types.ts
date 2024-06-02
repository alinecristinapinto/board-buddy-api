export type Game = {
  id: string;
  name: string;
  description: string;
  user_id: string;
};

export type AddGame = Omit<Game, 'id'>;
