import Component from '../component';
import appStore from '../appStore';
import './game.scss';

class Game extends Component {
  beforeRender() {
    appStore.type = 'game';
  }
}

const game = new Game({
  selector: '.page__main',
  template: `
      <section class="game"><h2 class="game__title">ЗАЕЗД</h2></section>
      </section><section class="keyboard"></section>
      <section class="race"></section>
    `,
});

export default game;
