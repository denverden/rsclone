import App from './components/app';
import routes from './components/routing/routesData';
import header from './components/header/header';

import './global.scss';

const APP = new App({
  components: [header],
  routes,
});

APP.start();
