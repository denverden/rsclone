import { IUser } from './IUser';

export interface IResUser {
  apiMessage: string;
  info: IUser;
  error?: string;
}
