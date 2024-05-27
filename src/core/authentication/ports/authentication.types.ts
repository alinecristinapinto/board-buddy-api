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
