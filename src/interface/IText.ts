export interface IText {
  apiMessage: string;
  info: { _id: string; text: string; lang: string; level: number; groups: Array<string> };
  error?: string;
}
