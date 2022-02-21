import Component from '../component';
import './footer.scss';

const footer = new Component({
  selector: '.page__footer',
  template: `
    <footer class="footer">
      <div class="footer__content">
        <div class="footer__info">
          &#169; 2022 KEYBOARD RACE | Разработчики:
          <a class="footer__link" target="_blank" href="https://github.com/oreshkevich">Henadzi</a>,
          <a class="footer__link" target="_blank" href="https://github.com/denverden">Denverden</a>,
          <a class="footer__link" target="_blank" href="https://github.com/Rusveld">Rusveld</a>
        </div>
        <a href="https://rs.school/" target="_blank" class="footer__logo"></a>
      </div>
    </footer>
  `,
});

export default footer;
