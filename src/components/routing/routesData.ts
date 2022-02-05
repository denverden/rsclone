import error404 from '../error404/error404';
import { IRoute } from '../../interface/IRoute';
import keyboard from '../keyboard/keyboard';
import welcome from '../section-welcome/welcome';
import features from '../features/features';
import rating from '../rating/rating';

const routes: Array<IRoute> = [
  { path: '', components: [features, welcome, rating] },
  { path: 'learn', components: [keyboard] },
  { path: '***', components: [error404] },
];

export default routes;
