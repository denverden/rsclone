import Component from '../component';
import './welcome.scss';
import one from './0.jpg';
import two from './1.jpg';
import three from './2.jpg';
import four from './3.jpg';
import five from './4.jpg';
import six from './5.jpg';
import appStore from '../appStore';

class Welcome extends Component {
  beforeRender() {
    this.stateTemplate = {
      races: appStore.user.races.toString(),
      signs: appStore.user.signs.toString(),
      time: this.formatGameDate(appStore.user.time),
      mistakes: this.percentMistakes(appStore.user.mistakes),
      username: appStore.user.username !== '' ? appStore.user.username : 'незнакомец',
    };
  }

  formatGameDate(timeSeconds: number) {
    const hours = new Date(timeSeconds * 1000).getUTCHours().toString();
    const minutes = new Date(timeSeconds * 1000).getUTCMinutes().toString();
    const seconds = new Date(timeSeconds * 1000).getUTCSeconds().toString();

    return [hours, minutes, seconds].join(':');
  }

  percentMistakes(mistakes: number) {
    const hundredPercent = 100;
    const percent = appStore.user.signs === 0 ? '0' : ((mistakes * hundredPercent) / appStore.user.signs).toFixed(1);

    return `${percent}%`;
  }

  addImg() {
    const images = [one, two, three, four, five, six];
    const { length } = images;
    let index = 1;

    setInterval(() => {
      if (index === length) {
        index = 0;
      }
      document.getElementById('image').style.background = `linear-gradient(0deg, #0000001e, #0000001e), url('${
        images[index++]
      }') no-repeat center top fixed`;
    }, 10000);
  }

  afterRender() {
    // this.addImg();
  }
}

const welcome = new Welcome({
  selector: '.page__welcome',
  template: `
  <section id="image" class="welcome">
  <div class="container">

    <h2 class=" welcome__title">
      Приветствуем, {{ username }}
    </h2>
    <div class="info-wrapper">
      <div class="info">
        <span class="info__value">{{ races }}</span>
        <span class="info__title">Заездов пройдено</span>
      </div>
      <div class="info">
        <span class="info__value">{{ signs }}</span>
        <span class="info__title">Знаков набрано</span>
      </div>
      <div class="info">
        <span class="info__value">{{ time }}</span>
        <span class="info__title">Время набора</span>
      </div>
      <div class="info">
        <span class="info__value">{{ mistakes }}</span>
        <span class="info__title">Процент ошибок</span>
      </div>
    </div>
    <div class="start">
      <div class="start__tire-right"></div>
      <a href="#game" class="start__button">Быстрый старт</a>
      <a href="#learn" class="start__button">Начать обучение</a>
      <div class="start__tire-left"></div>
    </div>
  </div>
</section>

  `,
});

export default welcome;
