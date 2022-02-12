import { ILog } from '../interface/ILog';
import { IResUser } from '../interface/IResUser';
import { IUser } from '../interface/IUser';
import http from './http';

function getCookie(name: string) {
  const matches = document.cookie.match(new RegExp(`(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

class AppStore {
  public apiUrl: string;

  public user: IUser;

  public type: string;

  constructor() {
    this.reset();
    this.apiUrl = 'https://keyboardrace.herokuapp.com';
    this.type = 'game';
  }

  reset() {
    this.user = {
      _id: localStorage.getItem('userId') ? localStorage.getItem('userId') : '',
      username: '',
      password: '',
      roles: ['USER'],
      level: 0,
      experience: 0,
      lesson: localStorage.getItem('lesson') ? parseInt(localStorage.getItem('lesson'), 10) : 1,
      races: localStorage.getItem('races') ? parseInt(localStorage.getItem('races'), 10) : 0,
      signs: localStorage.getItem('signs') ? parseInt(localStorage.getItem('signs'), 10) : 0,
      time: localStorage.getItem('time') ? parseInt(localStorage.getItem('time'), 10) : 0,
      mistakes: localStorage.getItem('mistakes') ? parseInt(localStorage.getItem('mistakes'), 10) : 0,
      speed: localStorage.getItem('speed') ? parseInt(localStorage.getItem('speed'), 10) : 0,
      avatar: '',
      token: getCookie('token') ? getCookie('token') : '',
    };
  }

  async saveUser() {
    if (this.user._id !== '' && this.user.token !== '') {
      http.addLog<ILog>('info', `Завершен урок №${this.user.lesson}`);
      await http.updateUser<IResUser>();
    } else {
      localStorage.setItem('lesson', this.user.lesson.toString());
      localStorage.setItem('races', this.user.races.toString());
      localStorage.setItem('signs', this.user.signs.toString());
      localStorage.setItem('time', this.user.time.toString());
      localStorage.setItem('mistakes', this.user.mistakes.toString());
      localStorage.setItem('speed', this.user.speed.toString());
    }
  }

  async loadUser() {
    if (this.user._id !== '' && this.user.token !== '') {
      const resUser = await http.getUser<IResUser>(this.user._id);

      if (resUser.error === 'NO') {
        this.user = JSON.parse(JSON.stringify(resUser.info));
        this.user.token = getCookie('token') ? getCookie('token') : '';
      }
    }
  }
}

export default new AppStore();
