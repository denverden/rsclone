import App from './components/app';
import routes from './components/routing/routesData';

import page from './components/page/page';
import header from './components/header/header';
import footer from './components/footer/footer';
import './global.scss';
import login from './components/login/login';

const APP = new App({
components: [],
  routes,
});

APP.start();
