import Component from '../component';
import './profile.scss'
import appStore from '../appStore';

class Profile extends Component{
  afterRender(): void {
      const name = document.querySelector('.personal-name')
      name.textContent = appStore.user.username
  }
}


const profile = new Profile({
  selector: '.page__main',
  template: `<div class="parallax-bg">
              <div class="personal-stats">
                <div class="stats-card">
                  <div class="card-img1"></div>
                  <div class="card-info">
                    <p class="achive-value"><span>0</span> зн/мин</p>
                    <p class="achive-name">Макс. скорость</p>
                  </div>
                </div>
                <div class="stats-card">
                  <div class="card-img1"></div>
                  <div class="card-info">
                    <p class="achive-value"><span>0</span> зн/мин</p>
                    <p class="achive-name">Макс. скорость</p>
                  </div>
                </div>
                <div class="stats-card">
                  <div class="card-img1"></div>
                  <div class="card-info">
                    <p class="achive-value"><span>0</span> зн/мин</p>
                    <p class="achive-name">Макс. скорость</p>
                  </div>
                </div>
                <div class="stats-card">
                  <div class="card-img1"></div>
                  <div class="card-info">
                    <p class="achive-value"><span>0</span> зн/мин</p>
                    <p class="achive-name">Макс. скорость</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="main-acc-container">
              <div class="personal-info">
                <div class="personal-photo">
                  <div class="photo-container"></div>
                </div>
                <p class="personal-name"></p>
              </div>

`
});

export default profile;

