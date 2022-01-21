import error404 from '../error404/error404';
import { IRoute } from '../../interface/IRoute';
import footer from '../footer/footer'

const routes: Array<IRoute> = [
  { path: 'footer', components: [footer] },
  { path: '***', components: [error404] },
];

export default routes;
