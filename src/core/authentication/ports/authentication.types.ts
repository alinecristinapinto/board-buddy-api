export type UserSignUp = {
  email: string;
  password: string;
};

export type UserSignIn = {
  email: string;
  password: string;
};

export type RequestPasswordReset = {
  email: string;
};

export type PasswordReset = {
  password: string;
};

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
