import Component from '../Component';
import './rating.scss';
import avatar from './avatar.png';

const rating = new Component({
  selector: '.page__rating',
  template: `
      <section class="rating">
        <h2 class="rating__title">Типы гонок</h2>
        <div class="rating__card-container">
          <div class="rating__card">
            <div class="rating__card-number">1</div>
            <img class="rating__card-img" src="${avatar}" alt="avatar">
            <div class="rating__card-text">453 <span> Заездов </span> </div>
            <div class="rating__card-text">1023<span> опыт </span></div>
          </div>
          <div class="rating__card">
            <div class="rating__card-number">1</div>
            <img class="rating__card-img" src="${avatar}" alt="avatar">
            <div class="rating__card-text">453 <span> Заездов </span> </div>
            <div class="rating__card-text">1023<span> опыт </span></div>
          </div>
          <div class="rating__card">
            <div class="rating__card-number">1</div>
            <img class="rating__card-img" src="${avatar}" alt="avatar">
            <div class="rating__card-text">453 <span> Заездов </span> </div>
            <div class="rating__card-text">1023<span> опыт </span></div>
          </div>
          <div class="rating__card">
            <div class="rating__card-number">1</div>
            <img class="rating__card-img" src="${avatar}" alt="avatar">
            <div class="rating__card-text">453 <span> Заездов </span> </div>
            <div class="rating__card-text">1023<span> опыт </span></div>
          </div>
          <div class="rating__card">
            <div class="rating__card-number">1</div>
            <img class="rating__card-img" src="${avatar}" alt="avatar">
            <div class="rating__card-text">453 <span> Заездов </span> </div>
            <div class="rating__card-text">1023<span> опыт </span></div>
          </div>
          <div class="rating__card">
            <div class="rating__card-number">1</div>
            <img class="rating__card-img" src="${avatar}" alt="avatar">
            <div class="rating__card-text">453 <span> Заездов </span> </div>
            <div class="rating__card-text">1023<span> опыт </span></div>
          </div>
          <div class="rating__card">
            <div class="rating__card-number">1</div>
            <img class="rating__card-img" src="${avatar}" alt="avatar">
            <div class="rating__card-text">453 <span> Заездов </span> </div>
            <div class="rating__card-text">1023<span> опыт </span></div>
          </div>
          <div class="rating__card">
            <div class="rating__card-number">1</div>
            <img class="rating__card-img" src="${avatar}" alt="avatar">
            <div class="rating__card-text">453 <span> Заездов </span> </div>
            <div class="rating__card-text">1023<span> опыт </span></div>
          </div>
        </div>
      </section>


  `,
});

export default rating;
