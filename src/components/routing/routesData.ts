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
import achievement from '../achievement/achievement';
import garage from '../garage/garage';
import headerWithButtons from '../header-with-buttons/header-with-buttons'
import header from '../header/header';

const routes: Array<IRoute> = [
  { path: '', components: [header, user, features, welcome, rating] },
  { path: 'learn', components: [learn, keyboard, headerWithButtons, user] },
  { path: 'game', components: [game, keyboard, headerWithButtons, user] },
  { path: 'signin', components: [signin, headerWithButtons, user] },
  { path: 'signup', components: [signup, headerWithButtons, user] },
  { path: 'profile', components: [profile, headerWithButtons, user] },
  { path: 'garage', components: [garage, headerWithButtons, user] },
  { path: 'achievement', components: [achievement, headerWithButtons, user] },
  { path: '***', components: [error404, headerWithButtons, user] },
];

export default routes;
