import Component from '../component';
import './page.scss';

const page = new Component({
  selector: 'body',
  template: `<div class="page__header"></div><div class="page__main"></div><div class="page__footer"></div>`,
});

export default page;
