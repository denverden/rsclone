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
import buttonsHeader from '../buttons-header/buttons-header';


const routes: Array<IRoute> = [
  { path: '', components: [ user, features, welcome, rating] },
  { path: 'learn', components: [learn, keyboard, user, buttonsHeader] },
  { path: 'game', components: [game, keyboard, user, buttonsHeader] },
  { path: 'signin', components: [signin, user, buttonsHeader] },
  { path: 'signup', components: [signup, user, buttonsHeader] },
  { path: 'profile', components: [profile, user, buttonsHeader] },
  { path: 'garage', components: [garage, user, buttonsHeader] },
  { path: 'achievement', components: [achievement, user, buttonsHeader] },
  { path: '***', components: [error404, user, buttonsHeader] },
];

export default routes;
