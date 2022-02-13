import Component from '../component';
import './profile.scss';
import appStore from '../appStore';
import { IResLog } from '../../interface/IResLog';
import http from '../http';



class Profile extends Component {
  beforeRender() {
    this.stateTemplate = {
      races: appStore.user.races.toString(),
      signs: appStore.user.signs.toString(),
      time: this.formatGameTime(appStore.user.time),
      mistakes: this.percentMistakes(appStore.user.mistakes),
      username: appStore.user.username !== '' ? appStore.user.username : 'незнакомец',
      avatar: appStore.user.avatar,
    };

  }

  formatGameDate(timeSeconds: number) {
    const day = new Date(timeSeconds * 1000).getUTCDay().toString();
    const month = new Date(timeSeconds * 1000).getUTCMonth().toString();
    const year = new Date(timeSeconds * 1000).getUTCFullYear().toString();

    return [day, month, year].join('.');
  }

  formatGameTime(timeSeconds: number) {
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

  async afterRender() {
    const name = document.querySelector('.personal-name');
    const photoInput = document.getElementById('photo-input') as HTMLInputElement;
    const photoContainer = document.getElementsByClassName('photo-container')[0] as HTMLImageElement;

    name.textContent = appStore.user.username;
    function handleFiles() {
      const fileList = this.files;
      const reader = new FileReader();

      reader.readAsDataURL(fileList[0])
      reader.onload = (event) =>{
        const imgPhoto = document.createElement('img');
        imgPhoto.src = `${event.target.result}`;

        imgPhoto.onload = () =>{
          const canvas = document.createElement('canvas');

          canvas.width = 200;
          canvas.height = 200;

          const imgUrl = canvas.toDataURL('image/png')
          appStore.user.avatar = `${imgUrl}`
          http.updateUser();
          photoContainer.src = `${imgUrl}`
        }
      }
    }

    photoInput.addEventListener("change", handleFiles)

    const resLog = await http.getLog<IResLog>();
    if (resLog.error === 'NO') {
      const logs = resLog.info;

      const logContainer = document.querySelector('.table-races');
      logs.forEach((value) => {
        const logCard = document.createElement('div');
        logCard.insertAdjacentHTML(
          'beforeend',
          `
          <div class="table-races__date">${this.formatGameDate(value.time)}</div>
          <div class="table-races__time">${this.formatGameTime(value.time)}</div>
          <div class="table-races__status">${value.type}</div>
          <div class="table-races__text">${value.text}</div>
        `
        );
        logCard.classList.add('table-races__item');
        logContainer.append(logCard);
      });
    }
  }}


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
                  <img class="photo-container" src="{{ avatar }}"></img>
                  <input type="file" id="photo-input" class="hidden">
                  <label for="photo-input" class="photo-changer">Изменить</label>
                </div>
                <p class="personal-name">{{ username }}</p>
              </div>
              <div class="table-races">
                <!-- <div class="table-races__item">
                  <div class="table-races__time">19:00</div>
                  <div class="table-races__status">Завершен</div>
                  <div class="table-races__text">Завершен заезд</div>
                </div> -->
              </div>
            </div>

            `,
});

export default profile;
