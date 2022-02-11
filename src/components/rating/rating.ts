import Component from '../component';
import './rating.scss';
import http from '../http';
import { IResUserStatistics } from '../../interface/IResUserStatistics';
class Rating extends Component {
  async afterRender() {
    const resRating = await http.getRating<IResUserStatistics>();
    if (resRating.error === 'NO') {
      const userStatistics = resRating.info;

      const ratingCardContainer = document.querySelector('.rating__card-container');
      userStatistics.forEach((value, index) => {
        const ratingCard = document.createElement('div');
        ratingCard.insertAdjacentHTML(
          'beforeend',
          `
        <div class="rating__card-number">${index + 1}</div>
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
}
const rating = new Rating({
  selector: '.page__rating',
  template: `
      <section class="rating">
        <h2 class="rating__title">РЕЙТИНГ</h2>
        <div class="rating__card-container">
        </div>
      </section>
  `,
});

export default rating;
