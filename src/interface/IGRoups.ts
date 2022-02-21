export interface IGroups {
  apiMessage: string;
  info: Array<{
    _id: string;
    name: string;
    learn: boolean;
  }>;
  error?: string;
}
