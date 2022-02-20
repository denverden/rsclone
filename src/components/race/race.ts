import Component from '../component';
import { IData } from '../../interface/IData';
import './race.scss';
import { cars } from '../cars';
import appStore from '../appStore';

class Race extends Component {
  private timerId: NodeJS.Timer;

  private car: HTMLElement;

  private carCpu: HTMLElement;

  constructor(data: IData) {
    super(data);

    this.timerId = setInterval(() => console.log(''), 1000);
    this.car = null;
    this.carCpu = null;
  }

  reset() {
    clearInterval(this.timerId);
    this.car.setAttribute('style', `left: 0%`);
    this.carCpu.setAttribute('style', `left: 0%`);
  }

  init() {
    this.car = document.querySelector('.car');;
    this.carCpu = document.querySelector('.car--cpu');
  }

  afterRender() {
    this.init();
    document.addEventListener('keypress', () => {
      this.car.setAttribute('style', `left: ${appStore.current*88/appStore.race}%`);
      this.car.querySelector('.well1').setAttribute('style', `transform: rotateZ(${20*appStore.current}deg)`);
      this.car.querySelector('.well2').setAttribute('style', `transform: rotateZ(${20*appStore.current}deg)`);
    });

    this.car.innerHTML = cars[appStore.user.car];
    if (appStore.type === 'learn' || appStore.type === 'game') {
      const res = Object.keys(cars);
      const randCar = Math.floor(Math.random() * (Object.keys(cars).length));
      const randColor = `#${(Math.random().toString(16)).substring(2,8).toUpperCase()}`;

      this.carCpu.innerHTML = cars[res[randCar]];
      this.carCpu.querySelectorAll('.car--cpu .body').forEach((patch) => {
        patch.setAttribute('style', `fill: ${randColor}`);
      });

      this.timerId = setInterval(() => {
        if (appStore.current > 0) {
          this.carCpu.setAttribute('style', `left: ${appStore.currentcpu*88/appStore.race}%`);
          this.carCpu.querySelector('.well1').setAttribute('style', `transform: rotateZ(${20*appStore.currentcpu}deg)`);
          this.carCpu.querySelector('.well2').setAttribute('style', `transform: rotateZ(${20*appStore.currentcpu}deg)`);
          appStore.currentcpu += appStore.currentcpu < appStore.race ? 2 : appStore.currentcpu;
        }
      }, 1000);
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
