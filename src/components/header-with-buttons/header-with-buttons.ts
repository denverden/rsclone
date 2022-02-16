import Component from '../component';
import logo from './logo.svg';
import './header-with-buttons.scss'
const headerWithButtons = new Component({
  selector: '.page__header',
  template: `
    <header class="header">
      <div class="header__container">
        <div class="header__logo">
          <a href="/" class="logo">
            <img src="${logo}" alt="logo">
          </a>
          <div class="buttons-container">
            <a href="#game" class="start__button start__button--header">Быстрый старт</a>
            <a href="#learn" class="start__button start__button--header">Начать обучение</a>
          </div>
          <div class="header__user"></div>
        </div>
      </div>
    </header>
  `,
})

export default headerWithButtons;
