import { IResUser } from '../../interface/IResUser';
import Component from '../component';
import message from '../message/message';
import http from '../http';
import garage from './garage.jpg';
import user from './user.svg';
import key from './key.svg';
import './signup.scss';

class SignUp extends Component {
  afterRender() {
    document.querySelector('.signup__content').addEventListener('submit', (event) => {
      event.preventDefault();
      const LOGIN = (document.querySelector('#username') as HTMLInputElement).value;
      const PASSWORD = (document.querySelector('#password') as HTMLInputElement).value;
      const CONFIRM_PASSWORD = (document.querySelector('#password-confirm') as HTMLInputElement).value;
      if (PASSWORD === CONFIRM_PASSWORD) {
        this.doSingUp(LOGIN, PASSWORD);
      } else {
        message.view('Пароли не совподают.');
      }
    });
  }

  async doSingUp(login: string, password: string) {
    const BTN = document.querySelector('.signup__btn') as HTMLInputElement;
    BTN.disabled = true;
    BTN.innerHTML = 'Загрузка...';

    const resUser = await http.registration<IResUser>(login, password);

    if (resUser.error === 'NO') {
      message.view('Пользователь зарегестрирован.');
      window.location.hash = '#signin';
    } else {
      message.view(resUser.apiMessage);
    }

    BTN.innerHTML = 'Зарегистрироваться';
    BTN.disabled = false;
  }
}

const signup = new SignUp({
  selector: '.page__main',
  template: `
    <div class="signup">
      <img class="signup__img" src="${garage}">
      <form class="signup__content" method="POST" action="">
        <h2 class="signup__title">РЕГИСТРАЦИЯ</h2>
        <label class="signup__username" for="username">
          <img class="signup__icon" src="${user}">
          <input class="signup__input" type="text" id="username" placeholder="ИМЯ ПОЛЬЗОВАТЕЛЯ" required>
        </label>
        <label class="signup__password" for="password">
          <img class="signup__icon" src="${key}">
          <input class="signup__input" type="password" id="password" placeholder="ПАРОЛЬ" autocomplete="off" required>
          </label>
        <label class="signup__password" for="password-confirm">
          <img class="signup__icon" src="${key}">
          <input class="signup__input" type="password" id="password-confirm" placeholder="ПОВТОР ПАРОЛЯ" autocomplete="off" required>
        </label>
        <button type="submit" class="signup__btn">Зарегистрироваться</button>
      </form>
    </div>
  `,
});

export default signup;
