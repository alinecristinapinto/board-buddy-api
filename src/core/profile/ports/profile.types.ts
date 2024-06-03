export type Profile = {
  id: string;
  name: string;
  blocked: boolean;
};

export type UpdateProfile = Profile;
export type FindProfile = Pick<Profile, 'id'>;
