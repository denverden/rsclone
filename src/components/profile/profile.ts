import Component from '../component';
import './profile.scss';
import appStore from '../appStore';
import { IResLog } from '../../interface/IResLog';
import http from '../http';
import user from '../user/user';
import message from '../message/message';
import { IResUser } from '../../interface/IResUser';
import { ILog } from '../../interface/ILog';

class Profile extends Component {
  beforeRender() {
    this.stateTemplate = {
      races: appStore.user.races.toString(),
      signs: appStore.user.signs.toString(),
      time: this.formatGameTime(appStore.user.time),
      mistakes: this.percentMistakes(appStore.user.mistakes),
      username: appStore.user.username !== '' ? appStore.user.username : 'незнакомец',
      avatar: appStore.user.avatar,
      experience: appStore.user.experience.toString(),
      level: appStore.user.level.toString(),
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
    const photoContainer = document.querySelector('.photo-container') as HTMLImageElement;

    name.textContent = appStore.user.username;
    function handleFiles() {
      const fileList = this.files;
      const reader = new FileReader();

      reader.readAsDataURL(fileList[0]);
      reader.onload = (event) => {
        const imgPhoto = document.createElement('img');
        imgPhoto.src = `${event.target.result}`;

        imgPhoto.onload = async () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          canvas.width = 180;
          canvas.height = 180;

          ctx.drawImage(imgPhoto, 0, 0, 180, 180);

          const imgUrl = canvas.toDataURL('image/png');

          appStore.user.avatar = `${imgUrl}`;
          const resUser = await http.updateUser<IResUser>();

          if (resUser.error === 'NO') {
            photoContainer.src = `${imgUrl}`;
            user.beforeRender();
            user.render();
            user.afterRender();
          } else {
            message.view('Ошибка обновления аватара.', 'warning');
          }
        };
      };
    }

    photoInput.addEventListener('change', handleFiles);

    const resLog = await http.getLog<IResLog>();
    if (resLog.error === 'NO') {
      const logs = resLog.info;

      const logContainer = document.querySelector('.table-races');
      logs
        .reverse()
        .slice(0, 14)
        .forEach((value: ILog) => {
          const logCard = document.createElement('div');

          const date = new Date(value.time);

          logCard.insertAdjacentHTML(
            'beforeend',
            `
          <div class="table-races__date">${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}</div>
          <div class="table-races__time">${date.getHours()}:${date.getMinutes()}</div>
          <div class="table-races__text">${value.text}</div>
        `
          );
          logCard.classList.add('table-races__item');
          logContainer.append(logCard);
        });
    }
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
            <div class="main-acc-container profile-acc-container">
              <div class="personal-info">
                <div class="personal-photo">
                  <img class="photo-container" src="{{ avatar }}"></img>
                  <input type="file" id="photo-input" class="hidden">
                  <label for="photo-input" class="photo-changer">Изменить</label>
                </div>
                <p class="personal-name">{{ username }}</p>
                <p class="personal-expirience">Ваш уровень: {{ level }}</p>
                <p class="personal-expirience">Опыт: {{ experience }}</p>

              </div>
              <div class="table-races">
                <h2 class="table-title">Ваши последние действия:</h2>
              </div>
            </div>
  `,
});

export default profile;
