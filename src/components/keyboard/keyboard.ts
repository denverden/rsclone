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
    showColor.addEventListener('click', () => {
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
    rightHandOne.style.display = 'none';
    showHand.addEventListener('click', () => {
      showHand.classList.toggle('hide-hand');
      rightHandOne.style.display = rightHandOne.style.display === 'none' ? 'block' : 'none';
    });

    setTimeout(() => {
      const textAll = document.querySelector('.text').innerHTML;

      const resultArr = textAll.split('');
      const rightThumbArr = ['Space'];
      const rightPointerArr = ['Digit6', 'Digit7', 'KeyY', 'KeyU', 'KeyH', 'KeyJ', 'KeyN', 'KeyM'];
      const rightMiddleArr = ['Digit8', 'KeyI', 'KeyK', 'Comma'];
      const rightRingArr = ['Digit9', 'KeyO', 'KeyL', 'Period'];
      const rightLittleArr = ['Digit0', 'KeyP', 'Semicolon', 'BracketLeft', 'BracketRight'];
      const leftThumbArr = ['Space'];
      const leftPointerArr = ['Digit4', 'Digit5', 'KeyR', 'KeyT', 'KeyF', 'KeyG', 'KeyV', 'KeyB'];
      const leftMiddleArr = ['Digit3', 'KeyE', 'KeyD', 'KeyC'];
      const leftRingArr = ['Digit2', 'KeyW', 'KeyS', 'KeyX'];
      const leftLittleArr = ['Backquote', 'Digit1', 'KeyQ', 'KeyA', 'KeyZ'];
      const allArrRightHand = [...rightPointerArr, ...rightMiddleArr, ...rightRingArr, ...rightLittleArr];
      const allArrLeftHand = [...leftPointerArr, ...leftMiddleArr, ...leftRingArr, ...leftLittleArr];
      let i = 0;

      const btn = document.querySelector(`.keyboard__key[data-lang="${resultArr[i]}"]`) as HTMLElement;
      const btnShiftLeft = document.querySelector(`.keyboard__key[data-key="ShiftLeft"]`) as HTMLElement;
      const btnShiftRight = document.querySelector(`.keyboard__key[data-key="ShiftRight"]`) as HTMLElement;
      console.log(btnShiftLeft);
      btn.style.backgroundColor = 'red';

      if (allArrLeftHand.includes(btn.dataset.key)) {
        btnShiftRight.style.backgroundColor = 'red';
      } else if (allArrRightHand.includes(btn.dataset.key)) {
        btnShiftLeft.style.backgroundColor = 'red';
      }

      const handImgKey = (arg: HTMLElement) => {
        const dataKey = arg.dataset.key;
        const position = arg.getBoundingClientRect();
        const x = position.left;
        const y = position.top;

        const arrHand = ['lhand1', 'lhand2', 'lhand3', 'lhand4', 'lhand0', 'rhand0', 'rhand1', 'rhand2', 'rhand3', 'rhand4'];

        const handImg = (numberHand: string) => {
          const rightHand = document.getElementById(`${numberHand}`);
          const correctionFactorLeft = 12;
          const correctionFactorTop = 20;
          rightHand.style.left = `${x - correctionFactorLeft}px`;
          rightHand.style.top = `${y + correctionFactorTop}px`;
          rightHand.style.display = 'block';
        };

        const handImgShift = (numberHand: string, argShift: HTMLElement) => {
          const positionShift = argShift.getBoundingClientRect();
          const xShift = positionShift.left;
          const yShift = positionShift.top;
          const rightHand = document.getElementById(`${numberHand}`);
          const correctionFactorLeft = 12;
          const correctionFactorTop = 20;
          rightHand.style.left = `${xShift - correctionFactorLeft}px`;
          rightHand.style.top = `${yShift + correctionFactorTop}px`;
          rightHand.style.display = 'block';
        };
        if (leftPointerArr.includes(dataKey)) {
          handImg(arrHand[0]);
        } else if (leftMiddleArr.includes(dataKey)) {
          handImg(arrHand[1]);
        } else if (leftRingArr.includes(dataKey)) {
          handImg(arrHand[2]);
        } else if (leftLittleArr.includes(dataKey)) {
          handImg(arrHand[3]);
        } else if (leftThumbArr.includes(dataKey)) {
          handImg(arrHand[4]);
        } else if (rightPointerArr.includes(dataKey)) {
          handImg(arrHand[6]);
        } else if (rightMiddleArr.includes(dataKey)) {
          handImg(arrHand[7]);
        } else if (rightRingArr.includes(dataKey)) {
          handImg(arrHand[8]);
        } else if (rightLittleArr.includes(dataKey)) {
          handImg(arrHand[9]);
        }
        if (btnShiftRight.style.backgroundColor === 'red') {
          handImgShift(arrHand[9], btnShiftRight);
        } else if (btnShiftLeft.style.backgroundColor === 'red') {
          handImgShift(arrHand[3], btnShiftLeft);
        }
      };
      handImgKey(btn);
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

          handImgKey(btn2);
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
  <div class="show">
  <span class="show-keyboard" title="Скрыть клавиатуру"></span>
  <span class="show-color" title="Показать цвет"></span>
  <span class="show-hand" title="Показать руки"></span>
  </div>
  <div id="keyboard"></div>
</div>`,
});

export default keyboard;
