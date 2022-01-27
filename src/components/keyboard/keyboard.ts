/* eslint-disable max-len */
import { IData } from '../../interface/IData';
import { IKeyLayout } from '../../interface/IKeyLayout';
import { IText } from '../../interface/IText';
import HTTP from '../http';
import Component from '../Component';
import './keyboard.scss';

class Keyboard extends Component {
  private keysContainer: HTMLElement;

  private lang: string;

  constructor(data: IData) {
    super(data);
    this.lang = 'ru';
    this.keysContainer = null;
    this.stateTemplate = { text: 'loading...' };
  }

  init() {
    this.keysContainer = document.createElement('div');
    this.keysContainer.classList.add('keyboard__keys');
    this.keysContainer.appendChild(this.createKeys());
    this.elem.querySelector('#keyboard').appendChild(this.keysContainer);
  }

  createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout: IKeyLayout = {
      Backquote: '`',
      Digit1: '1',
      Digit2: '2',
      Digit3: '3',
      Digit4: '4',
      Digit5: '5',
      Digit6: '6',
      Digit7: '7',
      Digit8: '8',
      Digit9: '9',
      Digit0: '0',
      Minus: '-',
      Equal: '=',
      Backspace: '⇦',
      KeyQ: 'Q',
      KeyW: 'W',
      KeyE: 'E',
      KeyR: 'R',
      KeyT: 'T',
      KeyY: 'Y',
      KeyU: 'U',
      KeyI: 'I',
      KeyO: 'O',
      KeyP: 'P',
      BracketLeft: '[',
      BracketRight: ']',
      CapsLock: 'caps',
      KeyA: 'A',
      KeyS: 'S',
      KeyD: 'D',
      KeyF: 'F',
      KeyG: 'G',
      KeyH: 'H',
      KeyJ: 'J',
      KeyK: 'K',
      KeyL: 'L',
      Semicolon: ';',
      Quote: "'",
      Enter: 'enter',
      ShiftLeft: 'shift',
      KeyZ: 'Z',
      KeyX: 'X',
      KeyC: 'C',
      KeyV: 'V',
      KeyB: 'B',
      KeyN: 'N',
      KeyM: 'M',
      Comma: ',',
      Period: '.',
      Slash: '?',
      ShiftRight: 'shift',
      Space: ' ',
    };
    const keyLayoutRu: IKeyLayout = {
      Backquote: 'Ё',
      Digit1: '1',
      Digit2: '2',
      Digit3: '3',
      Digit4: '4',
      Digit5: '5',
      Digit6: '6',
      Digit7: '7',
      Digit8: '8',
      Digit9: '9',
      Digit0: '0',
      Minus: '-',
      Equal: '=',
      Backspace: '⇦',
      KeyQ: 'Й',
      KeyW: 'Ц',
      KeyE: 'У',
      KeyR: 'К',
      KeyT: 'Е',
      KeyY: 'Н',
      KeyU: 'Г',
      KeyI: 'Ш',
      KeyO: 'Щ',
      KeyP: 'З',
      BracketLeft: 'Х',
      BracketRight: 'Ъ',
      CapsLock: 'caps',
      KeyA: 'Ф',
      KeyS: 'Ы',
      KeyD: 'В',
      KeyF: 'А',
      KeyG: 'П',
      KeyH: 'Р',
      KeyJ: 'О',
      KeyK: 'Л',
      KeyL: 'Д',
      Semicolon: 'Ж',
      Quote: 'Э',
      Enter: 'enter',
      ShiftLeft: 'shift',
      KeyZ: 'Я',
      KeyX: 'Ч',
      KeyC: 'С',
      KeyV: 'М',
      KeyB: 'И',
      KeyN: 'Т',
      KeyM: 'Ь',
      Comma: 'Б',
      Period: 'Ю',
      Slash: ',',
      ShiftRight: 'shift',
      Space: ' ',
    };

    const keys = Object.keys(keyLayout);
    keys.forEach((key) => {
      const keyElement = document.createElement('button');
      const insertLineBreak = ['Backspace', 'BracketRight', 'Enter'].indexOf(key) !== -1;
      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');
      keyElement.setAttribute('data-key', key);
      if (this.lang === 'ru') {
        keyElement.textContent = keyLayoutRu[key];
        keyElement.setAttribute('data-lang', keyLayoutRu[key]);
      } else {
        keyElement.textContent = keyLayout[key];
        keyElement.setAttribute('data-lang', keyLayout[key]);
      }

      fragment.appendChild(keyElement);
      if (insertLineBreak) {
        fragment.appendChild(document.createElement('br'));
      }
    });

    return fragment;
  }

  eventBtn() {
    const showColor = document.querySelector('.show-color');
    showColor.addEventListener('click', (event) => {
      showColor.classList.toggle('hide-color');
      document.querySelectorAll('.keyboard__key').forEach((elem) => {
        elem.classList.toggle('keyboard__key--coloring');
      });
    });

    const showKeyboard = document.querySelector('.show-keyboard');
    const showHand = document.querySelector('.show-hand');
    const rightHandOne = document.getElementById('hands');

    showKeyboard.addEventListener('click', () => {
      showKeyboard.classList.toggle('hide-keyboard');
      this.elem.querySelector('#keyboard').classList.toggle('keyboard--hidden');
    });

    showHand.addEventListener('click', () => {
      showHand.classList.toggle('hide-hand');
      rightHandOne.classList.toggle('active--hand');
    });

    setTimeout(() => {
      const textAll = document.querySelector('.text').innerHTML;

      const resultArr = textAll.split('');
      let i = 0;

      const btn = document.querySelector(`.keyboard__key[data-lang="${resultArr[i]}"]`) as HTMLElement;
      btn.style.backgroundColor = 'red';

      const dataKey = btn.dataset.key;
      const position = btn.getBoundingClientRect();
      const x = position.left;
      const y = position.top;

      const arrHand = ['lhand1', 'lhand2', 'lhand3', 'lhand4', 'lhand0', 'rhand0', 'rhand1', 'rhand2', 'rhand3', 'rhand4'];

      const handImg = (numberHand: string) => {
        const rightHand = document.getElementById(`${numberHand}`);
        rightHand.style.left = `${x - 10}px`;
        rightHand.style.top = `${y + 19}px`;
        rightHand.style.display = 'block';
      };

      if (
        dataKey === 'Digit4' ||
        dataKey === 'Digit5' ||
        dataKey === 'KeyY' ||
        dataKey === 'KeyU' ||
        dataKey === 'KeyF' ||
        dataKey === 'KeyG' ||
        dataKey === 'KeyV' ||
        dataKey === 'KeyB'
      ) {
        handImg(arrHand[0]);
      } else if (dataKey === 'Digit3' || dataKey === 'KeyE' || dataKey === 'KeyD' || dataKey === 'KeyC') {
        handImg(arrHand[1]);
      } else if (dataKey === 'Digit2' || dataKey === 'KeyW' || dataKey === 'KeyS' || dataKey === 'KeyX') {
        handImg(arrHand[2]);
      } else if (dataKey === 'Backquote' || dataKey === 'Digit1' || dataKey === 'KeyQ' || dataKey === 'KeyA' || dataKey === 'KeyZ') {
        handImg(arrHand[3]);
      }
      if (
        dataKey === 'Digit6' ||
        dataKey === 'Digit7' ||
        dataKey === 'KeyR' ||
        dataKey === 'KeyT' ||
        dataKey === 'KeyH' ||
        dataKey === 'KeyJ' ||
        dataKey === 'KeyN' ||
        dataKey === 'KeyM'
      ) {
        handImg(arrHand[6]);
      } else if (dataKey === 'Digit8' || dataKey === 'KeyI' || dataKey === 'KeyK' || dataKey === 'Comma') {
        handImg(arrHand[7]);
      } else if (dataKey === 'Digit9' || dataKey === 'KeyO' || dataKey === 'KeyL' || dataKey === 'Period') {
        handImg(arrHand[8]);
      } else if (dataKey === 'Digit0' || dataKey === 'KeyP' || dataKey === 'Semicolon' || dataKey === 'BracketLeft' || dataKey === 'BracketRight') {
        handImg(arrHand[9]);
      }
      document.addEventListener('keydown', (event) => {
        if (event.key === resultArr[i]) {
          document.querySelectorAll('.keyboard__key').forEach((item: HTMLElement) => {
            const itemElem = item;
            itemElem.style.backgroundColor = '';
          });
          document.querySelectorAll('.hand').forEach((item: HTMLElement) => {
            const itemElem = item;
            itemElem.style.display = 'none';
          });
          const resultTwo = resultArr[i + 1];

          const btn2 = document.querySelector(`.keyboard__key[data-lang="${resultTwo.toUpperCase()}"]`) as HTMLElement;
          btn2.style.backgroundColor = 'red';
          i++;

          console.log(btn2);
          const position2 = btn2.getBoundingClientRect();

          const x2 = position2.left;
          const y2 = position2.top;
          const rightHand2 = document.getElementById('rhand2');

          rightHand2.style.left = `${x2 - 10}px`;
          rightHand2.style.top = `${y2 + 19}px`;
          rightHand2.style.display = 'block';
        }
      });
    }, 3000);
  }

  async loadText() {
    const txt = await HTTP.getText<IText>();
    this.stateTemplate.text = txt.info.text;
    this.elem.querySelector('.text').innerHTML = txt.info.text;
    this.lang = txt.info.lang;
  }

  afterRender() {
    this.init();
    this.eventBtn();
    this.loadText();
  }
}

const keyboard = new Keyboard({
  selector: '.page__main',
  template: `
  <div class="text">{{ text }}</div>
  <div class="container-keyboard">
  <div id="hands" >
  <div class="hand lhand" id="lhand4" ></div>
<div class="hand lhand" id="lhand3" ></div>
<div class="hand lhand" id="lhand2" ></div>
<div class="hand lhand" id="lhand1" ></div>
<div class="hand lhand" id="lhand0" ></div>
<div class="hand rhand" id="rhand0" ></div>
<div class="hand rhand" id="rhand1" ></div>
<div class="hand rhand" id="rhand2" ></div>
<div class="hand rhand" id="rhand3" ></div>
<div class="hand rhand" id="rhand4" ></div>

  </div>
  <span class="show-keyboard" title="Скрыть клавиатуру"></span>
  <span class="show-color" title="Показать цвет"></span>
  <span class="show-hand" title="Показать руки"></span>
  <div id="keyboard"></div>
</div>`,
});

export default keyboard;
