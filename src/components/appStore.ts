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

  constructor() {
    this.user = {
      _id: localStorage.getItem('userId') ? localStorage.getItem('userId') : '',
      username: '',
      password: '',
      roles: ['USER'],
      level: 0,
      experience: 0,
      lesson: 0,
      avatar: '',
      achievements: [],
      token: getCookie('token') ? getCookie('token') : '',
    };
    this.apiUrl = 'https://keyboardrace.herokuapp.com';
  }

  async loadUser() {
    if (this.user._id !== '' && this.user.token !== '') {
      const resUser = await http.getUser<IResUser>(this.user._id);

      if (resUser.error === 'NO') {
        this.user = JSON.parse(JSON.stringify(resUser.info));
      }
    }
  }
}

export default new AppStore();
