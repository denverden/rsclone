import Component from '../component';
import './rating.scss';
import userStatistics from './userStatistics';

class Rating extends Component {
  afterRender() {
    const ratingCardContainer = document.querySelector('.rating__card-container');
    userStatistics.forEach((value) => {
      const ratingCard = document.createElement('div');
      ratingCard.insertAdjacentHTML(
        'beforeend',
        `
        <div class="rating__card-number">${value.id}</div>
        <img class="rating__card-img" src="${value.avatar}" alt="avatar">
        <div class="rating__card-text">${value.races}<span>  Заездов</span> </div>
        <div class="rating__card-text">${value.experience}<span> опыт  </span></div>
        `
      );
      ratingCard.classList.add('rating__card');
      ratingCardContainer.append(ratingCard);
    });
  }
}
const rating = new Rating({
  selector: '.page__rating',
  template: `
      <section class="rating">
        <h2 class="rating__title">Типы гонок</h2>
        <div class="rating__card-container">
        </div>
      </section>
  `,
});

export default rating;
