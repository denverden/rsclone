import Component from '../component';
import './features.scss';
import road from './road.svg';
import user from './user2.svg';
import keys from './keys.svg';
import vector from './vector.svg';

const features = new Component({
  selector: '.page__main',
  template: `
  <div class="page__welcome"></div>
<section class="features">
  <div class="container">
    <div class="content">
      <h2 class="features__title">keyboard race</h2>
      <div class="characteristics">
        <ul class="characteristics__list">
          <li class="characteristics__list-item"><span>Клавиатурный тренажёр</span> для ваших пальцев и мозгов. Пока
            глаза
            бегут по строчкам увлекательного текста, ваш навык слепого набора становится совершеннее. Руки сами
            набирают
            текст, а голова наполняется новыми знаниями.</li>
          <li class="characteristics__list-item"><span>Бесплатная онлайн игра</span> в духе автомобильных гонок на
            время.
            Клавогонки с друзьями на фоне красивых пейзажей, увлекательные тексты, широкий выбор авто. Печатайте
            быстрее,
            ставьте рекорды и приходите к финишу первым.</li>
          <li class="characteristics__list-item"><span>Увлекательное обучение быстрой печати.</span> Если вы
            обучаютесь
            слепому методу набора, гонки станут вашим лучшим помощником. Дух соперничества будет толкать вас на новые
            высоты и выводить на скорости, о которых вы и не мечтали.</li>
          <li class="characteristics__list-item"><span>Аналог «Клавогонок»</span> с расширенными возможностями и
            приятным
            интерфейсом. Совместите приятное с полезным. Каждый новый заезд сделает скорость печати быстрее, а
            необходимость смотреть на клавиатуру постепенно сойдёт на нет.</li>
        </ul>
        <div class="features__img">
          <img class="features__img-item" src="${road}" alt="road">
        </div>
      </div>
      <section class="garage">
        <h2 class="garage__title">Персональный гараж</h2>
        <div class="garage__item-wrapper">
          <div class="garage__item">
            <h3 class="garage__item-title garage__item-title--line-one">Автомобили</h3>
            <p class="garage__item-text">Выберите тип кузова вашего автомобиля: седан, хэтчбек, кабриолет, смарт или
              внедорожник</p>
          </div>
          <div class="garage__item">
            <h3 class="garage__item-title garage__item-title--line-two">Краска</h3>
            <p class="garage__item-text">Богатая цветовая палитра кузовов и элементов тюнинга позволит раскрасить
              ваш
              гоночный автомобиль</p>
          </div>
        </div>
        <div class="garage__item-wrapper garage__item-wrapper--padding">
          <div class="garage__item">
            <h3 class="garage__item-title garage__item-title--line-three">Аксессуары</h3>
            <p class="garage__item-text">Устанавливайте разнообразные формы дисков, спойлеров, капотов, люков и
              стёкол</p>
          </div>
          <div class="garage__item">
            <h3 class="garage__item-title garage__item-title--line-four">Наклейки</h3>
            <p class="garage__item-text">Добавляйте на кузов оригинальные наклейки, чтобы придать вашему гоночному
              автомобилю больше индивидуальности</p>
          </div>
        </div>
      </section>
      <section class="types-races">
        <h2 class="types-races__title">Типы гонок</h2>

        <div class="types-card">
          <div class="types-card__wrapper">
            <div class=" types-card__img">
              <img src="${user}" alt="user">
            </div>
            <div class="types-card__info">
              <h3 class="types-card__title">Гонки с людьми</h3>
              <p class="types-card__text">Соревнуйтесь в скорости печати на клавиатуре компьютера с реальными людьми со всего мира.</p>
            </div>
          </div>
          <div class="types-card__wrapper">
            <div class=" types-card__img">
              <img src="${keys}" alt="user">
            </div>
            <div class="types-card__info">
              <h3 class="types-card__title">Приватные гонки</h3>
              <p class="types-card__text">Создавайте заезды, защищённые паролем, чтобы играть онлайн в компании своих друзей.</p>
            </div>
          </div>
          <div class="types-card__wrapper">
            <div class=" types-card__img">
              <img src="${vector}" alt="user">
            </div>
            <div class="types-card__info">
              <h3 class="types-card__title">Гонки с ботами</h3>
              <p class="types-card__text">
                Совершенствуйте навык быстрой печати в компании ботов, чтобы набить руку в ожидании более сильных соперников.
              </p>
            </div>
          </div>
        </div>
      </section>
      <div class="page__rating"></div>
      </div>
      </div>
    </section>
    <div class="page__popup"></div>

  `,
});

export default features;
