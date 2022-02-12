import { ILog } from './ILog';

export interface IResLog {
  apiMessage?: string;
  info: Array<ILog>;
  error?: string;
}
