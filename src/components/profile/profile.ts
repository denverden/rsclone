import Component from '../component';
import './profile.scss'
import appStore from '../appStore';

class Profile extends Component{
  beforeRender() {
    this.stateTemplate = {
      races: appStore.user.races.toString(),
      signs: appStore.user.signs.toString(),
      time: this.formatGameDate(appStore.user.time),
      mistakes: this.percentMistakes(appStore.user.mistakes),
      username: appStore.user.username !== '' ? appStore.user.username : 'незнакомец',
    };
  }

  formatGameDate(timeSeconds: number) {
    const hours = new Date(timeSeconds * 1000).getUTCHours().toString();
    const minutes = new Date(timeSeconds * 1000).getUTCMinutes().toString();
    const seconds = new Date(timeSeconds * 1000).getUTCSeconds().toString();

    return [hours, minutes, seconds].join(':');
  }

  percentMistakes(mistakes: number) {
    const hundredPercent = 100;
    const percent = appStore.user.signs === 0 ? '0' : ((mistakes * hundredPercent) / appStore.user.signs).toFixed(1);

    return `${percent}%`;
  }

  afterRender(): void {
      const name = document.querySelector('.personal-name')
      name.textContent = appStore.user.username
  }
}


const profile = new Profile({
  selector: '.page__main',
  template: `<div class="parallax-bg">
              <div class="personal-stats">
                <div class="info-wrapper">
                  <div class="info">
                    <span class="info__value">{{ races }}</span>
                    <span class="info__title">Заездов пройдено</span>
                  </div>
                  <div class="info">
                    <span class="info__value">{{ signs }}</span>
                    <span class="info__title">Знаков набрано</span>
                  </div>
                  <div class="info">
                    <span class="info__value">{{ time }}</span>
                    <span class="info__title">Время набора</span>
                  </div>
                  <div class="info">
                    <span class="info__value">{{ mistakes }}</span>
                    <span class="info__title">Процент ошибок</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="main-acc-container">
              <div class="personal-info">
                <div class="personal-photo">
                  <div class="photo-container"></div>
                </div>
                <p class="personal-name"></p>
              </div>

`
});

export default profile;

