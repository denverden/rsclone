import Component from '../component';
import './achievement.scss';
import { IResAchievements } from '../../interface/IResAchievements';
import http from '../http';
import appStore from '../appStore';

class Achievement extends Component {
  async beforeRender() {
    const resAchievement = await http.getAchievement<IResAchievements>();
    console.log(resAchievement);

    if (resAchievement.error === 'NO') {
      // eslint-disable-next-line no-new-func
      // const func = new Function(appStore.user.lesson.toString(), resAchievement.achievements[0].func);
      // eslint-disable-next-line no-new-func
      // const func = new Function(appStore.user.lesson.toString(), `return ${resAchievement.achievements[0].func}`);
      // console.log(func());
    }

    const achievement = document.querySelector('.achievement');
    resAchievement.achievements.forEach((value) => {
      const achievementItem = document.createElement('div');
      achievementItem.insertAdjacentHTML(
        'beforeend',
        `
        <div class="achievement__item ">
        <img class="achievement__img-item" src="assets/images/${value.image}" alt="${value.name}">
        </div>
        <h3 class="achievement__text">${value.name}</h3>
        `
      );
      achievementItem.classList.add('achievement__wrapper');
      achievementItem.classList.add('achievement__item--filter');
      achievement.append(achievementItem);
    });
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
