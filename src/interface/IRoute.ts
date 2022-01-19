import Component from '../components/component';

export interface IRoute {
  path: string;
  components: Array<Component>;
}
