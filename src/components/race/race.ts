import Component from '../component';
import { IData } from '../../interface/IData';
import './race.scss';
import { cars } from '../cars';
import appStore from '../appStore';
import keyboard from '../keyboard/keyboard';
import message from '../message/message';

class Race extends Component {
  private timerId: NodeJS.Timer;

  private car: HTMLElement;

  private carCpu: HTMLElement;

  private carUser1: HTMLElement;

  private carUser2: HTMLElement;

  private carUser3: HTMLElement;

  constructor(data: IData) {
    super(data);

    this.timerId = setInterval(() => console.log(''), 1000);
    this.car = null;
    this.carUser1 = null;
    this.carUser2 = null;
    this.carUser3 = null;
    this.carCpu = null;
  }

  reset() {
    clearInterval(this.timerId);
    this.car.setAttribute('style', `left: 0%`);
    this.carUser1.setAttribute('style', `left: 0%`);
    this.carUser2.setAttribute('style', `left: 0%`);
    this.carUser3.setAttribute('style', `left: 0%`);
    this.carCpu.setAttribute('style', `left: 0%`);
    appStore.currentcpu = 0;
    appStore.current = 0;
  }

  init() {
    this.car = document.querySelector('.car');
    this.carUser1 = document.querySelector('.car--user1');
    this.carUser2 = document.querySelector('.car--user2');
    this.carUser3 = document.querySelector('.car--user3');
    this.carCpu = document.querySelector('.car--cpu');
  }

  afterRender() {
    this.init();
    this.reset();
    document.addEventListener('keypress', () => {
      this.car.setAttribute('style', `left: ${(appStore.current * 88) / appStore.race}%`);
      this.car.querySelector('.well1').setAttribute('style', `transform: rotateZ(${20 * appStore.current}deg)`);
      this.car.querySelector('.well2').setAttribute('style', `transform: rotateZ(${20 * appStore.current}deg)`);
    });

    this.car.innerHTML = cars[appStore.user.car];
    this.car.querySelectorAll('.car .body').forEach((patch) => {
      patch.setAttribute('style', `fill: ${appStore.user.carcolor}`);
    });

    console.log(appStore.user.color)

    if (appStore.type === 'learn') {
      const res = Object.keys(cars);
      const randCar = Math.floor(Math.random() * Object.keys(cars).length);
      const randColor = `#${Math.random().toString(16).substring(2, 8).toUpperCase()}`;



      this.carCpu.innerHTML = cars[res[randCar]];
      this.carCpu.querySelectorAll('.car--cpu .body').forEach((patch) => {
        patch.setAttribute('style', `fill: ${randColor}`);
      });

      this.timerId = setInterval(() => {
        if (appStore.current > 0) {
          this.carCpu.setAttribute('style', `left: ${(appStore.currentcpu * 88) / appStore.race}%`);
          this.carCpu.querySelector('.well1').setAttribute('style', `transform: rotateZ(${20 * appStore.currentcpu}deg)`);
          this.carCpu.querySelector('.well2').setAttribute('style', `transform: rotateZ(${20 * appStore.currentcpu}deg)`);
          appStore.currentcpu += appStore.currentcpu < appStore.race ? 0.2 : 0;

          if (appStore.currentcpu >= appStore.race) {
            clearInterval(this.timerId);
            appStore.user.races++;
            appStore.user.experience += 1;
            if (appStore.user.experience >= 1000) {
              appStore.user.level++;
              appStore.user.experience -= 1000;
            }

            appStore.user.time += Math.round(new Date().getTime() / 1000 - keyboard.startTime);
            appStore.saveUser();
            message.view('Заезд завершён.', 'success');
            keyboard.reset();
          }
        }
      }, 100);
    }

    if (appStore.type === 'game') {
      const res = Object.keys(cars);
      const randCar = Math.floor(Math.random() * Object.keys(cars).length);
      const randColor = `#${Math.random().toString(16).substring(2, 8).toUpperCase()}`;

      this.carCpu.innerHTML = cars[res[randCar]];
      this.carCpu.querySelectorAll('.car--cpu .body').forEach((patch) => {
        patch.setAttribute('style', `fill: ${randColor}`);
      });

      this.timerId = setInterval(() => {
        if (appStore.current > 0) {
          this.carCpu.setAttribute('style', `left: ${(appStore.currentcpu * 88) / appStore.race}%`);
          this.carCpu.querySelector('.well1').setAttribute('style', `transform: rotateZ(${20 * appStore.currentcpu}deg)`);
          this.carCpu.querySelector('.well2').setAttribute('style', `transform: rotateZ(${20 * appStore.currentcpu}deg)`);
          appStore.currentcpu += appStore.currentcpu < appStore.race ? 0.2 : 0;

          if (appStore.currentcpu >= appStore.race) {
            clearInterval(this.timerId);
            appStore.user.races++;
            appStore.user.experience += 1;
            if (appStore.user.experience >= 1000) {
              appStore.user.level++;
              appStore.user.experience -= 1000;
            }

            appStore.user.time += Math.round(new Date().getTime() / 1000 - keyboard.startTime);
            appStore.saveUser();
            message.view('Заезд завершён.', 'success');
            keyboard.reset();
          }
        }
      }, 100);
    }
  }
}

const race = new Race({
  selector: '.race',
  template: `
      <div class="race__street"></div>
      <div class="race__road">
        <div class="race__container">
          <div class="car"></div>
          <div class="car car--user1"></div>
          <div class="car car--user2"></div>
          <div class="car car--user3"></div>
          <div class="car car--cpu"></div>
        </div>
      </div>
      </div>
    `,
});

export default race;
