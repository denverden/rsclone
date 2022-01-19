import error404 from '../error404/error404';
import { IRoute } from '../../interface/IRoute';

const routes: Array<IRoute> = [
  { path: '', components: [] },
  { path: '***', components: [error404] },
];

export default routes;
