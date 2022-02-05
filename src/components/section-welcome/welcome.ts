import Component from '../Component';
import './welcome.scss';
import one from './0.jpg';
import two from './1.jpg';
import three from './2.jpg';
import four from './3.jpg';
import five from './4.jpg';
import six from './5.jpg';

class Welcome extends Component {
  addImg() {
    const images = [one, two, three, four, five, six];
    const { length } = images;
    let index = 1;

    setInterval(() => {
      if (index === length) {
        index = 0;
      }
      document.getElementById('image').style.backgroundImage = `url('${images[index++]}')`;
    }, 7000);
  }

  afterRender() {
    this.addImg();
  }
}

const welcome = new Welcome({
  selector: '.page__welcome',
  template: `
  <section id="image" class="welcome">
  <div class="container">

    <h2 class=" welcome__title">
      Приветствуем, незнакомец
    </h2>
    <div class="info-wrapper">
      <div class="info">
        <span class="info__value">0</span>
        <span class="info__title">Заездов пройдено</span>
      </div>
      <div class="info">
        <span class="info__value">0</span>
        <span class="info__title">Знаков набрано</span>
      </div>
      <div class="info">
        <span class="info__value">00:00</span>
        <span class="info__title">Время набора</span>
      </div>
      <div class="info">
        <span class="info__value">0.0%</span>
        <span class="info__title">Процент ошибок</span>
      </div>
    </div>
    <div class="start">
      <div class="start__tire-right"></div>
      <a href="#" class="start__button">Быстрый старт</a>
      <a href="#" class="start__button">Начать обучение</a>
      <div class="start__tire-left"></div>
    </div>
  </div>
</section>

  `,
});

export default welcome;
