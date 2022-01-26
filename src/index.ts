import App from './components/app';
import routes from './components/routing/routesData';


import './global.scss';

const APP = new App({
  components: [],
  routes,
});

APP.start();
