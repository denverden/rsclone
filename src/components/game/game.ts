import Component from '../component';
import './game.scss';

const game = new Component({
  selector: '.page__main',
  template: `
      <section class="game"><h2 class="game__title">ЗАЕЗД</h2></section>
      </section><section class="keyboard"></section>
      <section class="race"></section>
    `,
});

export default game;
