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

  constructor(data: IData) {
    super(data);
    this.lang = 'ru';
    this.current = 0;
    this.error = 0;
    this.text = '';
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
      const showColorKey = showColor.classList.toggle('hide-color');
      localStorage.setItem('showColorKey', JSON.stringify(showColorKey));
      document.querySelectorAll('.keyboard__key').forEach((elem) => {
        elem.classList.toggle('keyboard__key--coloring');
      });
    });

    const showKeyboard = document.querySelector('.show-keyboard');
    const showHand = document.querySelector('.show-hand');
    showKeyboard.addEventListener('click', () => {
      const showKey = showKeyboard.classList.toggle('hide-keyboard');
      localStorage.setItem('showKey', JSON.stringify(showKey));
      console.log(this.elem);
      this.elem.querySelector('#keyboard').classList.toggle('keyboard--hidden');
    });

    showHand.addEventListener('click', () => {
      const showHandKey = showHand.classList.toggle('hide-hand');
      localStorage.setItem('showHandKey', JSON.stringify(showHandKey));
      this.elem.querySelector('#keyboard').classList.toggle('hand--hidden');
    });

    function getLocalStorage() {
      if (localStorage.getItem('showColorKey')) {
        const showColorLocal = JSON.parse(localStorage.getItem('showColorKey'));
        if (showColorLocal) {
          showColor.classList.add('hide-color');
          document.querySelectorAll('.keyboard__key').forEach((elem) => {
            elem.classList.add('keyboard__key--coloring');
          });
        }
      }
      if (localStorage.getItem('showKey')) {
        const showKeyLocal = JSON.parse(localStorage.getItem('showKey'));
        if (showKeyLocal) {
          showKeyboard.classList.add('hide-keyboard');
          document.querySelector('#keyboard').classList.add('keyboard--hidden');
        }
      }
      if (localStorage.getItem('showHandKey')) {
        const showHandKeyLocal = JSON.parse(localStorage.getItem('showHandKey'));
        if (showHandKeyLocal) {
          showHand.classList.add('hide-hand');
          document.querySelector('#keyboard').classList.add('hand--hidden');
        }
      }
    }
    window.addEventListener('load', getLocalStorage);

    document.addEventListener('keypress', (event) => {
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
        appStore.user.lesson++;
        appStore.saveUser();
        message.view('Урок пройден.', 'success');
        this.reset();
      }
    });
  }

  async reset() {
    this.current = 0;
    this.error = 0;
    this.text = '';
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

    document.querySelectorAll('.keyboard__key').forEach((el: HTMLElement) => {
      el.classList.remove('active');
      el.style.backgroundColor = '';
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
        BTN_ACTIVE.style.backgroundColor = 'red';
      }
      if (keyLayout[key].alt === currentChar) {
        BTN_ACTIVE.classList.add('active');
        BTN_ACTIVE.style.backgroundColor = 'red';
        if (leftKey.indexOf(currentChar) === -1) {
          shiftLeft.classList.add('active');
          shiftLeft.style.backgroundColor = 'red';
        } else {
          shiftRight.classList.add('active');
          shiftRight.style.backgroundColor = 'red';
        }
      }
    });
  }

  async loadText() {
    const txt = appStore.type === 'learn' ? await HTTP.getLesson<IText>(appStore.user.lesson) : await HTTP.getText<IText>();
    console.log(appStore);
    this.elem.querySelector('.text').innerHTML = `<span class="gray">${txt.info.text}</span>`;
    this.text = txt.info.text;
    this.lang = txt.info.lang;
  }

  async afterRender() {
    await this.loadText();
    this.init();
    this.eventBtn();
    this.view(this.text[this.current]);
  }
}

const keyboard = new Keyboard({
  selector: '.keyboard',
  template: `
  <div class="instrumentation">
    <div class="error-keyboard" title="Ошибки">0</div>
    <div class="speed-keyboard" title="Скорость">0</div>
  </div>
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
