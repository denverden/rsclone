import error404 from '../error404/error404';
import { IRoute } from '../../interface/IRoute';
import keyboard from '../keyboard/keyboard';

const routes: Array<IRoute> = [
  { path: '', components: [] },
  { path: 'learn', components: [keyboard] },
  { path: '***', components: [error404] },
];

export default routes;
