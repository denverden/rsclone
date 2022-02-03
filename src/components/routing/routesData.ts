import error404 from '../error404/error404';
import { IRoute } from '../../interface/IRoute';
import signin from '../signin/signin';
import signup from '../signup/signup';
import profile from '../profile/profile';
import user from '../user/user';

const routes: Array<IRoute> = [
  { path: '', components: [user] },
  { path: 'signin', components: [signin, user] },
  { path: 'signup', components: [signup, user] },
  { path: 'profile', components: [profile, user] },
  { path: '***', components: [error404, user] },
];

export default routes;
