import { IData } from '../../interface/IData';
import { IText } from '../../interface/IText';
import HTTP from '../http';
import Component from '../component';
import './keyboard.scss';
import keyLayoutRu from './buttonsRu';
import keyLayoutEn from './buttonsEn';
import appStore from '../appStore';
import message from '../message/message';
import learn from '../learn/learn';
import race from '../race/race';
import { ILog } from '../../interface/ILog';

class Keyboard extends Component {
  private keysContainer: HTMLElement;

  private lang: string;

  private error: number;

  private text: string;

  private startTime: number;

  private speedText: number;

  constructor(data: IData) {
    super(data);
    this.lang = 'ru';
    this.error = 0;
    this.text = '';
    this.startTime = 0;
    this.speedText = 0;
    this.keysContainer = null;
  }

  init() {
    this.keysContainer = document.createElement('div');
    this.keysContainer.classList.add('keyboard__keys');
    this.keysContainer.appendChild(this.createKeys());
    this.elem.querySelector('#keyboard').appendChild(this.keysContainer);
  }

  createKeys() {
    const keyLayout = this.lang === 'ru' ? keyLayoutRu : keyLayoutEn;
    const fragment = document.createDocumentFragment();

    const keys = Object.keys(keyLayout);
    keys.forEach((key) => {
      const keyElement = document.createElement('div');
      const insertLineBreak = ['Backspace', 'Backslash', 'Enter'].indexOf(key) !== -1;
      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');
      keyElement.classList.add('hand');
      keyElement.setAttribute('data-key', key);
      keyElement.innerHTML = keyLayout[key].btnName;
      keyElement.classList.add(keyLayout[key].classHand);

      fragment.appendChild(keyElement);
      if (insertLineBreak) {
        fragment.appendChild(document.createElement('br'));
      }
    });

    return fragment;
  }

  initStateKeyboard() {
    const stateKeyboard = localStorage.getItem('stateKeyboard') !== null ? JSON.parse(localStorage.getItem('stateKeyboard')) : true;
    const stateColor = localStorage.getItem('stateColor') !== null ? JSON.parse(localStorage.getItem('stateColor')) : false;
    const stateHand = localStorage.getItem('stateHand') !== null ? JSON.parse(localStorage.getItem('stateHand')) : true;

    if (!stateHand) {
      document.querySelector('.control__key--hand').classList.add('hide');
      document.querySelector('#keyboard').classList.add('hand--hidden');
    }

    if (stateColor) {
      document.querySelector('.control__key--color').classList.add('hide');
      document.querySelectorAll('.keyboard__key').forEach((elem) => {
        elem.classList.add('keyboard__key--coloring');
      });
    }

    if (!stateKeyboard) {
      document.querySelector('.control__key--keyboard').classList.add('hide');
      document.querySelector('#keyboard').classList.add('keyboard--hidden');
    }
  }

  eventKeyControl() {
    const control = document.querySelector('.control');

    control.addEventListener('click', (event) => {
      const element = event.target as HTMLInputElement;

      if (element.classList.contains('control__key--keyboard')) {
        localStorage.setItem('stateKeyboard', JSON.stringify(!element.classList.toggle('hide')));
        this.elem.querySelector('#keyboard').classList.toggle('keyboard--hidden');
      }

      if (element.classList.contains('control__key--color')) {
        localStorage.setItem('stateColor', JSON.stringify(element.classList.toggle('hide')));
        document.querySelectorAll('.keyboard__key').forEach((elem) => {
          elem.classList.toggle('keyboard__key--coloring');
        });
      }

      if (element.classList.contains('control__key--hand')) {
        localStorage.setItem('stateHand', JSON.stringify(!element.classList.toggle('hide')));
        this.elem.querySelector('#keyboard').classList.toggle('hand--hidden');
      }
    });
  }

  eventKeyPress() {
    document.addEventListener('keypress', (event) => {
      this.startTime = this.startTime === 0 ? Math.round(new Date().getTime() / 1000) : this.startTime;
      this.speedText =
        new Date().getTime() / 1000 - this.startTime >= 1 ? Math.round((60 * appStore.current) / (new Date().getTime() / 1000 - this.startTime)) : 0;

      if (event.key === this.text[appStore.current]) {
        appStore.current++;
        const typedText = this.text.slice(0, appStore.current);
        const futurText = this.text.slice(appStore.current);
        (
          document.querySelector('.keyboard__text') as HTMLElement
        ).innerHTML = `<span class="keyboard__text--black">${typedText}</span><span class="keyboard__text--gray">${futurText}</span>`;
        this.view(this.text[appStore.current], this.text[appStore.current - 1]);
        appStore.user.signs++;
      } else {
        this.error++;
        appStore.user.mistakes++;
        (document.querySelector('.instrumentation__error') as HTMLElement).textContent = this.error.toString();
      }
      if (appStore.type === 'learn' && this.text.length === appStore.current) {
        appStore.user.races++;
        appStore.user.lesson++;
        appStore.user.time += Math.round(new Date().getTime() / 1000 - this.startTime);
        appStore.saveUser();
        message.view('Урок пройден.', 'success');
        this.reset();
      }

      if (appStore.type === 'game' && this.text.length === appStore.current) {
        appStore.user.races++;
        appStore.user.time += Math.round(new Date().getTime() / 1000 - this.startTime);
        appStore.saveUser();
        message.view('Заезд завершён.', 'success');
        this.reset();
      }

      appStore.user.speed = appStore.user.speed < this.speedText ? this.speedText : appStore.user.speed;
      (document.querySelector('.instrumentation__speed') as HTMLElement).textContent = this.speedText.toFixed(0).toString();
    });
  }

  async reset() {
    this.error = 0;
    this.text = '';
    this.startTime = 0;
    this.speedText = 0;
    await this.loadText();
    (document.querySelector('.instrumentation__error') as HTMLElement).textContent = this.error.toString();
    if (appStore.type === 'learn') {
      learn.setLessonName();
    }
    appStore.current = 0;
    appStore.currentcpu = 0;
    appStore.race = this.text.length;
    race.reset();
    race.afterRender();
  }

  view(currentChar: string, previousChar = currentChar) {
    const keyLayout = this.lang === 'ru' ? keyLayoutRu : keyLayoutEn;
    const leftKey = 'Ё!"№;%ЙЦУКЕФЫВАПЯЧСМИ~!@#$%QWERTASDFGZXCVB';
    const shiftLeft = document.querySelector(`.keyboard__key[data-key="ShiftLeft"]`) as HTMLElement;
    const shiftRight = document.querySelector(`.keyboard__key[data-key="ShiftRight"]`) as HTMLElement;
    const space = document.querySelector(`.keyboard__key[data-key="Space"]`) as HTMLElement;
    const keys = Object.keys(keyLayout);

    document.querySelectorAll('.keyboard__key').forEach((el: HTMLElement) => {
      el.classList.remove('active');
    });

    keys.forEach((key) => {
      const BTN_ACTIVE = document.querySelector(`.keyboard__key[data-key="${key}"]`) as HTMLElement;
      if (currentChar === ' ') {
        if (leftKey.indexOf(previousChar.toUpperCase()) === -1) {
          space.classList.add('lhand0');
          space.classList.remove('rhand0');
        } else {
          space.classList.add('rhand0');
          space.classList.remove('lhand0');
        }
      }
      if (keyLayout[key].normal === currentChar) {
        BTN_ACTIVE.classList.add('active');
      }
      if (keyLayout[key].alt === currentChar) {
        BTN_ACTIVE.classList.add('active');
        if (leftKey.indexOf(currentChar) === -1) {
          shiftLeft.classList.add('active');
        } else {
          shiftRight.classList.add('active');
        }
      }
    });
  }

  async loadText() {
    const txt = appStore.type === 'learn' ? await HTTP.getLesson<IText>(appStore.user.lesson) : await HTTP.getText<IText>();
    this.elem.querySelector('.keyboard__text').innerHTML = `<span class="keyboard__text--gray">${txt.info.text}</span>`;
    this.text = txt.info.text;
    this.lang = txt.info.lang;
  }

  async afterRender() {
    await this.loadText().then(() => {
      appStore.current = 0;
      appStore.currentcpu = 0;
      appStore.race = this.text.length;
      this.init();
      this.initStateKeyboard();
      this.eventKeyControl();
      this.eventKeyPress();
      this.view(this.text[appStore.current]);
    });
  }
}

const keyboard = new Keyboard({
  selector: '.keyboard',
  template: `
  <div class="instrumentation">
    <div class="instrumentation__error" title="Ошибки">0</div>
    <div class="instrumentation__speed" title="Скорость">0</div>
  </div>
  <div class="keyboard__text"></div>
  <div class="keyboard__container">
    <div class="control">
      <span class="control__key control__key--keyboard" title="Скрыть клавиатуру"></span>
      <span class="control__key control__key--color" title="Показать цвет"></span>
      <span class="control__key control__key--hand" title="Показать руки"></span>
    </div>
    <div id="keyboard"></div>
  </div>`,
});

export default keyboard;
