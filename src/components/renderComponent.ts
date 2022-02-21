import Component from './component';

function renderComponent(component: Component): void {
  if (typeof component.beforeRender !== 'undefined') {
    component.beforeRender();
  }

  component.render();

  if (typeof component.afterRender !== 'undefined') {
    component.afterRender();
  }
}

export default renderComponent;
