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

class Keyboard extends Component {
  private keysContainer: HTMLElement;

  private lang: string;

  private current: number;

  private error: number;

  private text: string;

  private startTime: number;

  private speedText: number;

  constructor(data: IData) {
    super(data);
    this.lang = 'ru';
    this.current = 0;
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

  eventBtn() {
    const showColor = document.querySelector('.show-color');

    showColor.addEventListener('click', () => {
      showColor.classList.toggle('hide-color');
      document.querySelectorAll('.keyboard__key').forEach((elem) => {
        elem.classList.toggle('keyboard__key--coloring');
      });
    });

    const showKeyboard = document.querySelector('.show-keyboard');
    const showHand = document.querySelector('.show-hand');

    showKeyboard.addEventListener('click', () => {
      showKeyboard.classList.toggle('hide-keyboard');
      this.elem.querySelector('#keyboard').classList.toggle('keyboard--hidden');
    });

    showHand.addEventListener('click', () => {
      showHand.classList.toggle('hide-hand');
      this.elem.querySelector('#keyboard').classList.toggle('hand--hidden');
    });

    document.addEventListener('keypress', (event) => {
      this.startTime = this.startTime === 0 ? Math.round(new Date().getTime() / 1000) : this.startTime;
      this.speedText =
        new Date().getTime() / 1000 - this.startTime >= 1 ? Math.round((60 * this.current) / (new Date().getTime() / 1000 - this.startTime)) : 0;

      if (event.key === this.text[this.current]) {
        this.current++;
        const typedText = this.text.slice(0, this.current);
        const futurText = this.text.slice(this.current);
        (document.querySelector('.text') as HTMLElement).innerHTML = `<span class="black">${typedText}</span><span class="gray">${futurText}</span>`;
        this.view(this.text[this.current], this.text[this.current - 1]);
        appStore.user.signs++;
      } else {
        this.error++;
        appStore.user.mistakes++;
        (document.querySelector('.error-keyboard') as HTMLElement).textContent = this.error.toString();
      }
      if (appStore.type === 'learn' && this.text.length === this.current) {
        appStore.user.races++;
        appStore.user.lesson++;
        appStore.user.time += new Date().getTime() / 1000 - this.startTime;
        appStore.saveUser();
        message.view('Урок пройден.', 'success');
        this.reset();
      }

      appStore.user.speed = appStore.user.speed < this.speedText ? this.speedText : appStore.user.speed;
      (document.querySelector('.speed-keyboard') as HTMLElement).textContent = this.speedText.toFixed(0).toString();
    });
  }

  async reset() {
    this.current = 0;
    this.error = 0;
    this.text = '';
    this.current = 0;
    this.startTime = 0;
    this.speedText = 0;
    await this.loadText();
    (document.querySelector('.error-keyboard') as HTMLElement).textContent = this.error.toString();
    learn.setLessonName();
  }

  view(currentChar: string, previousChar = currentChar) {
    const keyLayout = this.lang === 'ru' ? keyLayoutRu : keyLayoutEn;
    const leftKey = 'Ё!"№;%ЙЦУКЕФЫВАПЯЧСМИ~!@#$%QWERTASDFGZXCVB';
    const shiftLeft = document.querySelector(`.keyboard__key[data-key="ShiftLeft"]`) as HTMLElement;
    const shiftRight = document.querySelector(`.keyboard__key[data-key="ShiftRight"]`) as HTMLElement;
    const space = document.querySelector(`.keyboard__key[data-key="Space"]`) as HTMLElement;
    const keys = Object.keys(keyLayout);

    document.querySelectorAll('.keyboard__key').forEach((el) => el.classList.remove('active'));

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
    this.elem.querySelector('.text').innerHTML = `<span class="gray">${txt.info.text}</span>`;
    this.text = txt.info.text;
    this.lang = txt.info.lang;
  }

  async afterRender() {
    await this.loadText().then(() => {
      this.init();
      this.eventBtn();
      this.view(this.text[this.current]);
    });
  }
}

const keyboard = new Keyboard({
  selector: '.keyboard',
  template: `
  <div class="speed-keyboard" title="Скорость">0</div>
  <div class="error-keyboard" title="Ошибки">0</div>
  <div class="text"></div>
  <div class="container-keyboard">
    <div class="show">
      <span class="show-keyboard" title="Скрыть клавиатуру"></span>
      <span class="show-color" title="Показать цвет"></span>
      <span class="show-hand" title="Показать руки"></span>
    </div>
    <div id="keyboard"></div>
  </div>`,
});

export default keyboard;
