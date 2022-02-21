/* eslint-disable max-len */
import Component from '../component';
import './garage.scss';
import { cars } from '../cars';
import appStore from '../appStore';

class Garage extends Component {
  radio() {
    const variants = document.querySelector('.variants');

    variants.addEventListener('click', (event) => {
      const { target } = event;
      const targetValue = (target as HTMLInputElement).value;
      const carImg = document.querySelector('.car-img__img');

      if (targetValue === 'sedan') {
        (carImg as HTMLImageElement).innerHTML = cars.sedan;
      } else if (targetValue === 'hatchback') {
        (carImg as HTMLImageElement).innerHTML = cars.hatchback;
      } else if (targetValue === 'convertible') {
        (carImg as HTMLImageElement).innerHTML = cars.convertible;
      } else if (targetValue === 'smart') {
        (carImg as HTMLImageElement).innerHTML = cars.smart;
      } else if (targetValue === 'vehicle') {
        (carImg as HTMLImageElement).innerHTML = cars.vehicle;
      }
    });
  }

  afterRender() {
    this.radio();
  }
}
const garage = new Garage({
  selector: `.page__main`,
  template: `<div class="parallax-bg garage-parallax"></div>
            <div class="main-acc-container garage-container background">
						<section class="depot">
						<div class="wrapper-content">
            <h2 class="depot__title">Гараж</h2>
							<div class="variants-wrap">
								<div class="variants">
									<h4 class="variants__title">Варианты: </h4>
									<div class="variants__group">
										<div class="radio radio--active">
											<label class="radio__label">
												<input class="radio__input" type="radio" name="body" id="sedan"  value="sedan" checked="checked">
												<div class="radio__img">${cars.sedan}</div>
												<b class="radio__title">Седан</b>
												— бесплатно
											</label>
										</div>
										<div class="radio ">
											<label class="radio__label">
												<input class="radio__input" type="radio" name="body" id="hatchback" value="hatchback" >
												<div class="radio__img">${cars.hatchback}</div>
												<b class="radio__title">Хэтчбек</b>
												<span class="price">
													<span>300</span> <small>опыта </small>
													<a class="radio__buy" href="#">купить</a>
												</span>
											</label>
										</div>
										<div class="radio ">
											<label class="radio__label">
												<input class="radio__input" type="radio" name="body" id="convertible" value="convertible" >
												<div class="radio__img">${cars.convertible}</div>
												<b class="radio__title">Смарт</b>
												<span class="price">
													<span>300</span> <small>опыта </small>
													<a class="radio__buy" href="#">купить</a>
												</span>
											</label>
										</div>
										<div class="radio">
											<label class="radio__label">
												<input class="radio__input" type="radio" name="body" id="smart" value="smart" >
												<div class="radio__img">${cars.smart}</div>
												<b class="radio__title">Кабриолет</b>
												<span class="price">
													<span>300</span> <small>опыта </small>
													<a class="radio__buy" href="#">купить</a>
												</span>
											</label>
										</div>
										<div class="radio">
											<label class="radio__label">
												<input class="radio__input" type="radio" name="body"  id="vehicle" value="vehicle" >
												<div class="radio__img">${cars.vehicle}</div>
												<b class="radio__title">Внедорожник</b>
												<span class="price">
													<span>300</span> <small>опыта </small>
													<a class="radio__buy" href="#">купить</a>
												</span>
											</label>
										</div>

									</div>
								</div>
								<div class="car-img"><div class="car-img__img">${cars.sedan}</div></div>
							</div>
              <div style="color" class="color-wrapper">
              <input id="body" type="color" value="#89CA86" />
              <div class="color-text">Покраска</div>
              </div>
							<div class="depot__save">
								<a href="#" class="depot__button depot__button--save" data-toggle="tab">Сохранить изменения</a>
							</div>
						</div>
						<div id="car" class="depot__car"></div>
					</section>
            </div>

`,
});

export default garage;
