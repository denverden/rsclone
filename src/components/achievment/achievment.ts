import Component from '../component';
import './achievment.scss';
import wreath from './img/wreath.svg';

const achievment = new Component({
  selector: `.page__main`,
  template: `<div class="parallax-bg achievment-parallax"></div>
              <div class="main-acc-container achievment-container">
                <h2 class="main__title">Ваши достижения </h2>
                <div class="achievement">
                    <img class="achievement__img-item" src="${wreath}" alt="road">
                    <img class="achievement__img-item" src="${wreath}" alt="road">
                    <img class="achievement__img-item" src="${wreath}" alt="road">
                    <img class="achievement__img-item" src="${wreath}" alt="road">
                    <img class="achievement__img-item" src="${wreath}" alt="road">
                    <img class="achievement__img-item" src="${wreath}" alt="road">
                    <img class="achievement__img-item" src="${wreath}" alt="road">
                    <img class="achievement__img-item" src="${wreath}" alt="road">
                    <img class="achievement__img-item" src="${wreath}" alt="road">
                </div>
              </div>
            </div>

`,
});

export default achievment;
