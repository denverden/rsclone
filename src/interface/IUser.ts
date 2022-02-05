export interface IUser {
  _id: string;
  username: string;
  password: string;
  roles: Array<string>;
  level: number;
  experience: number;
  lesson: number;
  races: number;
  signs: number;
  time: number;
  mistakes: number;
  avatar: string;
  achievements: Array<string>;
  token?: string;
}
