import renderComponent from './renderComponent';
import Routing from './routing/routing';
import { IRoute } from '../interface/IRoute';
import Component from './component';
import { IPage } from '../interface/IPage';

class App {
  private components: Array<Component>;

  private routes: Array<IRoute>;

  constructor(data: IPage) {
    this.components = data.components;
    this.routes = data.routes;
  }

  initComponents() {
    this.components.forEach(renderComponent);
  }

  start() {
    this.initComponents();
    const routing = new Routing(this.routes);
    routing.initRoutes();
  }
}

export default App;
