import Component from '../component';

const buttonsHeader = new Component({
  selector: '.buttons-container',
  template: `
    <a href="#game" class="start__button start__button--header">Быстрый старт</a>
    <a href="#learn" class="start__button start__button--header">Начать обучение</a>
  `,
})

export default buttonsHeader;
