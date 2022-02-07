import Component from '../component';
import './game.scss';

const game = new Component({
  selector: '.page__main',
  template: '<section class="game"></section><section class="keyboard"></section><section class="race"></section>',
});

export default game;
