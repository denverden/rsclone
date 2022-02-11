import { IUser } from './IUser';

export interface IResUserStatistics {
  apiMessage?: string;
  info: Array<IUser>;
  error?: string;
}
