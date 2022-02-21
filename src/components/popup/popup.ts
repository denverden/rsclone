/* eslint-disable max-len */
import Component from '../component';
import './popup.scss';

class Popup extends Component {
  submit() {
    const modal = document.querySelector('.overlay');
    (modal as HTMLElement).style.transform = 'translateX(0)';

    modal.addEventListener('click', (event) => {
      const { target } = event;
      if (
        (target as HTMLElement).classList.contains('overlay') ||
        (target as HTMLElement).classList.contains('modal__close') ||
        (target as HTMLElement).classList.contains('popup__button')
      ) {
        (modal as HTMLElement).style.transform = 'translateX(-100vw)';
      }
    });
  }

  afterRender() {
    this.submit();
  }
}

const popup = new Popup({
  selector: '.page__popup',
  template: `
  <div class="overlay fade">
  <div class="overlay-wrapper">
    <button type="button" class="modal__close" aria-label="close">
    </button>
    <div class="popup">
      <div class="popup__wrapper">
        <h2 class="popup__title">Как печатать вслепую</h2>
        <ul class="characteristics__list">
          <li class="characteristics__list-item"><span>Главная идея</span> слепой печати в том, что за каждым пальцем
            закреплена своя зона клавиш.
            Это позволяет печатать не глядя на клавиатуру. Регулярно тренируйся и, благодаря мышечной памяти, все твои
            десять пальцев будут знать, куда нажать.
          </li>
          <li class="characteristics__list-item"><span>В уроках вы можете включить подсветку клавиатуры и рук </span>
            Цвет
            клавиш на этой клавиатуре поможет вам понять и запомнить, каким пальцем на какую
            клавишу нужно нажимать.
            Нажимай клавиши только тем пальцем, который для них предназначен.
            Когда набираешь текст, представляй расположение клавиш.
            Клавишу SHIFT всегда нажимает мизинец с противоположной стороны от нужной буквы.
            Пробел отбивай большим пальцем левой или правой руки, как тебе удобнее.
          </li>
          <li class="characteristics__list-item"><span>Движение
              пальцев</span> Не подглядывай на клавиатуру во время печати. Просто скользи пальцами по клавишам, пока
            не найдешь основную строку.
            Ограничь движение кистей и пальцев до минимума, только чтобы нажимать нужные клавиши. Держи руки и пальцы
            как можно ближе к исходной позиции. Это увеличит скорость набора текста и снизит нагрузку на кисти.
            Следи за безымянными пальцами и мизинцами, так как они часто остаются незадействованными.</li>
      </div>
      <div class="popup__item">
        <button class="popup__button">Далее </button>
      </div>
    </div>
  </div>
</div>
  `,
});

export default popup;
