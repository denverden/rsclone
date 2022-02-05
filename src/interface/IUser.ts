export interface IUser {
  _id: string;
  username: string;
  password: string;
  roles: Array<string>;
  level: number;
  experience: number;
  lesson: number;
  avatar: string;
  achievements: Array<string>;
  token?: string;
}
