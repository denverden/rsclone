import Component from '../component';
import './race.scss';
import { cars } from '../cars';
import appStore from '../appStore';

class Race extends Component {
  afterRender() {
    document.querySelector('.car').innerHTML = cars[appStore.user.car];
    if (appStore.type === 'learn') {
      const res = Object.keys(cars);
      const randCar = Math.floor(Math.random() * (Object.keys(cars).length));
      const randColor = `#${(Math.random().toString(16)).substring(2,8).toUpperCase()}`;

      document.querySelector('.car--cpu').innerHTML = cars[res[randCar]];
      document.querySelectorAll('.car--cpu .body').forEach((patch) => {
        patch.setAttribute('style', `fill: ${randColor}`);
      });

      document.querySelectorAll('.well1').forEach((el) => el.classList.add('well1--move'));
      document.querySelectorAll('.well2').forEach((el) => el.classList.add('well2--move'));
    }
  }

}

const race = new Race({
  selector: '.race',
  template: `
      <div class="race__street"></div>
      <div class="race__road"><div class="race__container"><div class="car"></div><div class="car car--cpu"></div></div></div>
      </div>
    `,
});

export default race;
