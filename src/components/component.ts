import { IData } from '../interface/IData';

class Component {
  public selector: string;

  public template: string;

  public elem: HTMLElement;

  constructor(data: IData) {
    this.selector = data.selector;
    this.template = data.template;
    this.elem = null;
  }

  render() {
    this.elem = document.querySelector(this.selector);
    this.elem.innerHTML = this.template;
  }
}

export default Component;
