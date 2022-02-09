import { IAchievements } from './IAchievements';

export interface IResAchievements {
  apiMessage?: string;
  achievements: Array<IAchievements>;
  error?: string;
}
