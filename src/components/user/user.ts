import appStore from '../appStore';
import Component from '../component';
import './user.scss';

class User extends Component {
  afterRender() {
    const BTN_SINGIN = document.querySelector('.user__btn-signin') as HTMLElement;
    const BTN_USER = document.querySelector('.user__btn-user') as HTMLElement;
    if (appStore.user._id !== '' && appStore.user.token !== '') {
      BTN_SINGIN.classList.add('hidden');
      BTN_USER.classList.remove('hidden');
    } else {
      BTN_SINGIN.classList.remove('hidden');
      BTN_USER.classList.add('hidden');
    }
  }
}

const user = new User({
  selector: '.header__user',
  template: `<a class="user__btn user__btn-signin" href="#signin">Войти</a><a class="user__btn user__btn-user hidden" href="#profile">User</a>`,
});

export default user;
