import Component from '../component';
import './profile.scss'
import appStore from '../appStore';
import http from '../http';

const logExample = [{
    iduser: {
      type: String,
      required: true,
    },
    time: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
      default: 'завершено',
    },
    text: {
      type: String,
      default: 'Заезд завершен',
    },
  },
  {
    iduser: {
      type: String,
      required: true,
    },
    time: {
      type: Number,
      default: 2345,
    },
    type: {
      type: String,
      default: 'не завршено',
    },
    text: {
      type: String,
      default: 'Урок не пройден',
    },
  },
]

class Profile extends Component{
  beforeRender() {
    this.stateTemplate = {
      races: appStore.user.races.toString(),
      signs: appStore.user.signs.toString(),
      time: this.formatGameDate(appStore.user.time),
      mistakes: this.percentMistakes(appStore.user.mistakes),
      username: appStore.user.username !== '' ? appStore.user.username : 'незнакомец',
      avatar: appStore.user.avatar,
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
      const name = document.querySelector('.personal-name');
      const photoInput = document.getElementById('photo-input') as HTMLInputElement;
      const table = document.querySelector('.table-races')

      name.textContent = appStore.user.username;



      function handleFiles() {
        const fileList = this.files;
        const reader = new FileReader();

        reader.readAsDataURL(fileList[0])
        reader.onload = () =>{
          appStore.user.avatar = `${reader.result}`
          http.updateUser();
        }
      }
      logExample.forEach((elem)=>{
        photoInput.addEventListener('change', handleFiles)
        const tableItem = document.createElement('div')
        tableItem.classList.add('table-races__item')
        const tableTime = document.createElement('div')
        tableTime.classList.add('table-races__time')
        tableTime.textContent = `${elem.time.default}`
        const tableStatus = document.createElement('div')
        tableStatus.classList.add('table-races__status')
        tableStatus.textContent = `${elem.type.default}`
        const tableText = document.createElement('div')
        tableText.classList.add('table-races__text')
        tableText.textContent = `${elem.text.default}`
        tableItem.append(tableTime, tableStatus, tableText)
        table.appendChild(tableItem)
      })
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
                  <img class="photo-container" src="{{ avatar }}"></img>
                  <input type="file" id="photo-input" class="hidden">
                  <label for="photo-input" class="photo-changer">Изменить</label>
                </div>
                <p class="personal-name"></p>
              </div>
              <div class="table-races">
                <!-- <div class="table-races__item">
                  <div class="table-races__time">19:00</div>
                  <div class="table-races__status">Завершен</div>
                  <div class="table-races__text">Завершен заезд</div>
                </div> -->
              </div>
            </div>

`
});

export default profile;

