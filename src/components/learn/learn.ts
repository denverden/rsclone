import appStore from '../appStore';
import Component from '../component';
import './learn.scss';

class Learn extends Component {
  beforeRender() {
    appStore.type = 'learn';
  }
}

const learn = new Learn({
  selector: '.page__main',
  template: `
    <section class="learn"></section>
    <section class="keyboard"></section>
    <section class="race"></section>
  `,
});

export default learn;
