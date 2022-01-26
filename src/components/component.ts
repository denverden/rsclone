import { IData } from '../interface/IData';
import { IStateTemplate } from '../interface/IStateTemplate';

const shablonTemplate = (template: string, state: IStateTemplate = {}): string => {
  const regex = /\{{(.*?)}}/g;
  const newTemplate = template.replace(regex, (_str, d) => (state[d.trim()] === undefined ? _str : state[d.trim()]));

  return newTemplate;
};

class Component {
  public selector: string;

  public template: string;

  public elem: HTMLElement;

  public stateTemplate: IStateTemplate;

  constructor(data: IData) {
    this.selector = data.selector;
    this.template = data.template;
    this.elem = null;
  }

  beforeRender(): void {
    // Implementation in future methods
  }

  afterRender(): void {
    // Implementation in future methods
  }

  render() {
    this.elem = document.querySelector(this.selector);
    this.elem.innerHTML = shablonTemplate(this.template, this.stateTemplate);
  }
}

export default Component;
