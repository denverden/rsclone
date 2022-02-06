import error404 from '../error404/error404';
import { IRoute } from '../../interface/IRoute';
import keyboard from '../keyboard/keyboard';
import signin from '../signin/signin';
import signup from '../signup/signup';
import personalAcc from '../personal-account/personal-account';
import user from '../user/user';

const routes: Array<IRoute> = [
  { path: '', components: [user] },
  { path: 'learn', components: [keyboard, user] },
  { path: 'signin', components: [signin, user] },
  { path: 'signup', components: [signup, user] },
  { path: 'profile', components: [personalAcc, user] },
  { path: '***', components: [error404, user] },
];

export default routes;
