import App from './components/app';
import appStore from './components/appStore';
import routes from './components/routing/routesData';
import page from './components/page/page';
import header from './components/header/header';
import footer from './components/footer/footer';
import './global.scss';
import personalAcc from './components/personal-account/personal-account'

const APP = new App({
  components: [page, header, footer, personalAcc],
  routes,
});

appStore.loadUser().then(() => APP.start());
