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
          <div class="buttons-container">
          </div>
          <div class="header__user"></div>
        </div>
      </div>
    </header>
  `,
});

export default header;
