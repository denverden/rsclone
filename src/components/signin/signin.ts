import { IResUser } from '../../interface/IResUser';
import appStore from '../appStore';
import Component from '../component';
import message from '../message/message';
import http from '../http';
import car from './car.jpg';
import user from './user.svg';
import key from './key.svg';
import './signin.scss';
import { ILog } from '../../interface/ILog';

class SignIn extends Component {
  beforeRender() {
    if (appStore.user._id !== '' && appStore.user.token !== '') {
      window.location.hash = '#profile';
    }
  }

  afterRender() {
    document.querySelector('.signin__content').addEventListener('submit', (event) => {
      event.preventDefault();
      const username = (document.querySelector('#username') as HTMLInputElement).value;
      const password = (document.querySelector('#password') as HTMLInputElement).value;
      this.doLogin(username, password);
    });
  }

  async doLogin(username: string, password: string) {
    const BTN = document.querySelector('.signin__btn') as HTMLInputElement;
    BTN.disabled = true;
    BTN.innerHTML = 'Загрузка...';

    const resUser = await http.login<IResUser>(username, password);

    if (resUser.error === 'NO') {
      appStore.user = JSON.parse(JSON.stringify(resUser.info));
      localStorage.setItem('userId', appStore.user._id);
      document.cookie = `token=${appStore.user.token}; max-age=86400`;
      http.addLog<ILog>('info', `Вход в аккаунт!`);
      window.location.hash = '#profile';
    } else {
      message.view(resUser.apiMessage, 'error');
    }

    BTN.innerHTML = 'Войти';
    BTN.disabled = false;
  }
}

const signin = new SignIn({
  selector: '.page__main',
  template: `
    <div class="signin">
      <img class="signin__img" src="${car}">
      <form class="signin__content" method="POST" action="">
        <h2 class="signin__title">АВТОРИЗАЦИЯ</h2>
        <label class="signin__username" for="username">
          <img class="signin__icon" src="${user}">
          <input class="signin__input" type="text" id="username" placeholder="ИМЯ ПОЛЬЗОВАТЕЛЯ" required>
        </label>
        <label class="signin__password" for="password">
          <img class="signin__icon" src="${key}">
          <input class="signin__input" type="password" id="password" placeholder="ПАРОЛЬ" autocomplete="off" required>
          </label>
        <button type="buttom" class="signin__btn">Войти</button>
        <p class="signin__singup">Не зарегистрированы?&nbsp;&nbsp;<a class="signin__link" href="#signup">Создать аккаунт</a></p>
      </form>
    </div>
  `,
});

export default signin;
