import error404 from '../error404/error404';
import { IRoute } from '../../interface/IRoute';
import keyboard from '../keyboard/keyboard';
import signin from '../signin/signin';
import signup from '../signup/signup';
import profile from '../profile/profile';
import user from '../user/user';
import learn from '../learn/learn';
import game from '../game/game';
import welcome from '../welcome/welcome';
import features from '../features/features';
import rating from '../rating/rating';
import achievment from '../achievment/achievment';
import garage from '../garage/garage';

const routes: Array<IRoute> = [
  { path: '', components: [user, features, welcome, rating] },
  { path: 'learn', components: [learn, keyboard, user] },
  { path: 'game', components: [game, keyboard, user] },
  { path: 'signin', components: [signin, user] },
  { path: 'signup', components: [signup, user] },
  { path: 'profile', components: [profile, user] },
  { path: 'garage', components: [garage, user] },
  { path: 'achievment', components: [achievment, user] },
  { path: '***', components: [error404, user] },
];

export default routes;
