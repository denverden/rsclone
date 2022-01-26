import error404 from '../error404/error404';
import { IRoute } from '../../interface/IRoute';
import login from '../login/login';


const routes: Array<IRoute> = [
  { path: '', components: [] },
  { path: 'login', components: [login]},
  { path: '***', components: [error404] },
];

export default routes;
