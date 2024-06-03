export type Auth = {
  email: string;
  password: string;
  name: string;
  blocked: boolean;
};

export type UserSignUp = Auth;

export type UserSignIn = Pick<Auth, 'email' | 'password'>;

export type User = {
  id: string;
  email?: string;
};

export type Session = {
  access_token: string;
  user: User;
};

export type UserResponse = {
  session: Session | null;
};
