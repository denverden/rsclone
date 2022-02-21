import { ILog } from '../../interface/ILog';
import appStore from '../appStore';
import Component from '../component';
import http from '../http';
import './user.scss';

class User extends Component {
  beforeRender(): void {
    this.stateTemplate = {
      avatar: appStore.user.avatar,
    };
  }

  afterRender() {
    const BTN_SINGIN = document.querySelector('.user__btn-signin') as HTMLElement;
    const BTN_USER = document.querySelector('.user__btn-user') as HTMLElement;
    const BTN_LOGOUT = document.querySelector('.user__nav-logout') as HTMLElement;
    const userImg = document.querySelector('.user__img');

    if (appStore.user._id !== '' && appStore.user.token !== '') {
      BTN_SINGIN.classList.add('hidden');
      BTN_USER.classList.remove('hidden');
    } else {
      BTN_SINGIN.classList.remove('hidden');
      BTN_USER.classList.add('hidden');
      userImg.classList.add('hidden');
    }

    BTN_USER.addEventListener('click', () => {
      const userNav = document.querySelector('.user__nav');
      userNav.classList.toggle('hidden');
    });

    document.addEventListener('click', (event) => {
      const userNav = document.querySelector('.user__nav');
      if (!(event.target as HTMLElement).classList.contains('nav-control')) {
        userNav.classList.add('hidden');
      }
    });

    BTN_LOGOUT.addEventListener('click', () => {
      http.addLog<ILog>('info', `Выход из аккаунта!`);
      localStorage.removeItem('userId');
      appStore.reset();
      document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
      document.location.hash = '';
    });
  }
}

const user = new User({
  selector: '.header__user',
  template: `<a class="user__btn user__btn-signin" href="#signin">Войти</a>
            <div class="user__btn user__btn-user hidden nav-control">
              <img class="user__img nav-control" src="{{ avatar }}" alt="avatar">
              <div class="user__btn-arrow nav-control"></div>
            </div>
            <div class="user__nav hidden">
              <a href="#profile" class="user__nav-profile user__nav-item nav-control">
                Профиль
              </a>
              <a href="#achievement" class="user__nav-achievements user__nav-item nav-control">
                Достижения
              </a>
              <a href="#garage" class="user__nav-garage user__nav-item nav-control">
                Гараж
              </a>
              <a href="#" class="user__nav-logout user__nav-item nav-control">
                Выход
              </a>
            </div>
    `,
});

export default user;
