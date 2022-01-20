import Component from '../component';
import { IRoute } from '../../interface/IRoute';
import renderComponent from '../renderComponent';

class Routing {
  private routes: Array<IRoute>;

  constructor(data: Array<IRoute>) {
    this.routes = data;
  }

  initRoutes() {
    window.addEventListener('hashchange', this.renderRoute.bind(this));
    this.renderRoute();
  }

  renderRoute() {
    let route = this.routes.find(
      (el) => el.path === window.location.hash.slice(1)
    );
    if (typeof route === 'undefined') {
      route = this.routes.find((el: IRoute) => el.path === '***');
    }
    route.components.forEach((component: Component) => {
      document.querySelector(
        component.selector
      ).innerHTML = `<${component.selector}></${component.selector}>`;
      renderComponent(component);
    });
  }
}

export default Routing;
