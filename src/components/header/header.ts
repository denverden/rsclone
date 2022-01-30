import Component from '../component';
import './header.scss';
import logo from './logo.svg';

const header = new Component({
  selector: '.page__header',
  template: `
    <header class="header">
      <div class="header__container">
        <div class="header__logo">
          <a href="/" class="logo">
            <img src="${logo}" alt="logo">
          </a>
          <nav class="menu">
              <ul class="menu__list">
                <li class="menu__item">
                  <a href="#" class="menu__link">об игре</a>
                </li>
                <li class="menu__item">
                  <a href="#" class="menu__link">гараж</a>
                </li>
                <li class="menu__item">
                  <a href="#" class="menu__link">типы гонок</a>
                </li>
                <li class="menu__item">
                  <a href="#" class="menu__link">рейтинг</a>
                </li
              </ul>
          </nav>
          <div class="header__user"></div>
        </div>
      </div>
    </header>
  `,
});

export default header;
