import Component from '../components/component';
import { IRoute } from './IRoute';

export interface IPage {
  components: Array<Component>;
  routes: Array<IRoute>;
}
