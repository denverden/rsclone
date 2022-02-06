import Component from "../component";
import './personal-account.scss'
import appStore from "../appStore";
import ready from "./garage";

class PersAcc extends Component{
  afterRender(): void {
      const personalName = document.querySelector(".personal-name") as HTMLParagraphElement;
      const pageMain = document.querySelector(".page__main") as HTMLElement;
      const achivments = document.querySelector(".achivments") as HTMLElement;
      const garage = document.querySelector(".garage") as HTMLElement;
      const personalStats = document.querySelector(".statistics") as HTMLElement;
      const personalSettings = document.querySelector(".personal-settings") as HTMLElement;

      document.addEventListener("DOMContentLoaded", ready);

      if(appStore.user._id !== '' && appStore.user.token !== ''){
        personalName.textContent = appStore.user.username;
      }

      pageMain.addEventListener("click", (e)=>{
        if((e.target as HTMLElement).classList.contains("garage-control")) {
          const controlBtns = document.querySelectorAll(".field-controls--item") as NodeList;
          [achivments, personalSettings, personalStats].forEach(e=>{
            (e as HTMLElement).style.visibility = "hidden"
          });
          garage.style.visibility = "visible";
          controlBtns.forEach( e =>{
            (e as HTMLElement).style.backgroundColor = "rgba(102, 102, 102, 0.349)"
          });
          (e.target as HTMLElement).style.backgroundColor = "rgba(102, 102, 102, 0.692)"
          console.log("garage")
        }
        if((e.target as HTMLElement).classList.contains("achivment-control")) {
          const controlBtns = document.querySelectorAll(".field-controls--item") as NodeList;
          achivments.style.visibility = "visible";
          [garage, personalSettings, personalStats].forEach(e=>{
            (e as HTMLElement).style.visibility = "hidden"
          });
          controlBtns.forEach( e =>{
            (e as HTMLElement).style.backgroundColor = "rgba(102, 102, 102, 0.349)"
          });
          (e.target as HTMLElement).style.backgroundColor = "rgba(102, 102, 102, 0.692)"
          console.log("achivments")
        }
        if((e.target as HTMLElement).classList.contains("stats-control")) {
          const controlBtns = document.querySelectorAll(".field-controls--item") as NodeList;
          [garage, personalSettings, achivments].forEach(e=>{
            (e as HTMLElement).style.visibility = "hidden"
          });
          personalStats.style.visibility = "visible";
          controlBtns.forEach( e =>{
            (e as HTMLElement).style.backgroundColor = "rgba(102, 102, 102, 0.349)"
          });
          (e.target as HTMLElement).style.backgroundColor = "rgba(102, 102, 102, 0.692)"
          console.log("stats")
        }
        if((e.target as HTMLElement).classList.contains("profile-settings-control")) {
          const controlBtns = document.querySelectorAll(".field-controls--item") as NodeList;
          [garage, achivments, personalStats].forEach(e=>{
            (e as HTMLElement).style.visibility = "hidden"
          });
          personalSettings.style.visibility = "visible";
          controlBtns.forEach( e =>{
            (e as HTMLElement).style.backgroundColor = "rgba(102, 102, 102, 0.349)"
          });
          (e.target as HTMLElement).style.backgroundColor = "rgba(102, 102, 102, 0.692)"
          console.log("settings")
        }
      })
  }
};

const personalAcc = new PersAcc({
  selector: ".page__main",
  template: `

      <div class="parallax-bg">
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
          <p class="personal-name">user user</p>
          <div class="field-controls">
            <div class="achivment-control field-controls--item">Достижения</div>
            <div class="garage-control field-controls--item">Гараж</div>
            <div class="stats-control field-controls--item">Статистика</div>
            <div class="profile-settings-control field-controls--item">Настройки профиля</div>
          </div>
        </div>
        <div class="achivments personal-field">
          <div class="achivment">
            <div class="achivment-img"></div>
            <p class="achivment-info">Заезды - Золото</p>
          </div>
          <div class="achivment">
            <div class="achivment-img"></div>
            <p class="achivment-info">Заезды - Золото</p>
          </div>
          <div class="achivment">
            <div class="achivment-img"></div>
            <p class="achivment-info">Заезды - Золото</p>
          </div>
          <div class="achivment">
            <div class="achivment-img"></div>
            <p class="achivment-info">Заезды - Золото</p>
          </div>
          <div class="achivment">
            <div class="achivment-img"></div>
            <p class="achivment-info">Заезды - Золото</p>
          </div>
          <div class="achivment">
            <div class="achivment-img"></div>
            <p class="achivment-info">Заезды - Золото</p>
          </div>
          <div class="achivment">
            <div class="achivment-img"></div>
            <p class="achivment-info">Заезды - Золото</p>
          </div>
          <div class="achivment">
            <div class="achivment-img"></div>
            <p class="achivment-info">Заезды - Золото</p>
          </div>
          <div class="achivment">
            <div class="achivment-img"></div>
            <p class="achivment-info">Заезды - Золото</p>
          </div>
        </div>
        <div class="garage personal-field"><section class="depot">
        <div class="wrapper-content">
          <nav class="depot__nav">
            <ul class="depot__nav-ul">
              <li class="depot__item">
                <a class="depot__button" href="#" data-toggle="tab">Кузов</a>
              </li>
              <li class="depot__item">
                <a href="#" class="depot__button" data-toggle="tab">Краска</a>
              </li>
              <li class="depot__item">
                <a href="#" class="depot__button" data-toggle="tab">Стекла</a>
              </li>
              <li class="depot__item">
                <a href="#" class="depot__button" data-toggle="tab">Диски</a>
              </li>
            </ul>
          </nav>

          <div id="car" class="depot__car"></div>
        </div>
      </section></div>
        <div class="statistics personal-field">personal-stats</div>
        <div class="personal-settings personal-field">personal-settings</div>
      </div>

  `
});

export default personalAcc;
