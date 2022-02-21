import appStore from '../appStore';
import Component from '../component';
import './learn.scss';

class Learn extends Component {
  beforeRender() {
    appStore.type = 'learn';
    this.stateTemplate = {
      lesson: appStore.user.lesson.toString(),
    };
  }

  setLessonName() {
    (document.querySelector('.learn__title') as HTMLElement).textContent = `УРОК №${appStore.user.lesson}`;
  }
}

const learn = new Learn({
  selector: '.page__main',
  template: `
    <section class="learn"><h2 class="learn__title">УРОК №{{ lesson }}</h2></section>
    <div class="page__popup"></div>
    <section class="keyboard"></section>
    <section class="race"></section>
  `,
});

export default learn;
