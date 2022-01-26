export interface IUser {
  apiMessage: string;
  info: {
    _id: string;
    username: string;
    password: string;
    roles: Array<string>;
    level: number;
    experience: number;
    token?: string;
  };
  error?: string;
}
