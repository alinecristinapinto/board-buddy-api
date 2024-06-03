export type Profile = {
  email: string;
  password: string;
  name: string;
  blocked: boolean;
};

export type UserSignUp = Profile;

export type UserSignIn = Pick<Profile, 'email' | 'password'>;

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
