import Component from '../component';
import './achievement.scss';
import { IResAchievements } from '../../interface/IResAchievements';
import http from '../http';
import appStore from '../appStore';

class Achievement extends Component {
  async afterRender() {
    const resAchievement = await http.getAchievement<IResAchievements>();

    if (resAchievement.error === 'NO') {
      const achievement = document.querySelector('.achievement');

      resAchievement.achievements.forEach((value) => {
        const paramArg = value.func.split(',')[0];
        const paramFunc = value.func.split(',')[1];
        const func = new Function(paramArg, `return ${paramFunc}`);
        const achievementItem = document.createElement('div');

        achievementItem.insertAdjacentHTML(
          'beforeend',
          `
          <div class="achievement__item" title="${value.description}">
          <img class="achievement__img-item" src="assets/images/${value.image}" alt="${value.name}">
          </div>
          <h3 class="achievement__text">${value.name}</h3>
          `
        );
        achievementItem.classList.add('achievement__wrapper');
        if (!func(appStore.user[paramArg].toString())) {
          achievementItem.classList.add('achievement__item--filter');
        }
        achievement.append(achievementItem);
      });
    }
  }
}

const achievement = new Achievement({
  selector: `.page__main`,
  template: `<div class="parallax-bg achievement-parallax"></div>
              <div class="main-acc-container achievement-container">
                <h2 class="main__title">Ваши достижения </h2>
                <div class="achievement">
                </div>
              </div>
            </div>
`,
});

export default achievement;
