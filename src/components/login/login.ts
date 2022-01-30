import Component from '../Component';
import './login.scss'


class LoginClass extends Component{
  afterRender(): void {
    const loginBtn = document.querySelector(".login-btn") as HTMLElement;
    const registrationBtn = document.querySelector(".registration-btn") as HTMLElement;
    const loginInputs = document.querySelector(".login-inputs") as HTMLElement;
    const registrationInputs = document.querySelector(".registration-inputs") as HTMLElement;
    const container = document.querySelector(".login-container") as HTMLElement;

    loginBtn.addEventListener("click", ()=>{
      loginInputs.style.transform = "translateX(0)";
      registrationInputs.style.transform = "translateX(0)";
      loginBtn.style.backgroundColor = "#000000ce";
      registrationBtn.style.backgroundColor = "white";
      loginBtn.style.color = "white";
      registrationBtn.style.color = "black";
      container.style.height = "300px";
    })

    registrationBtn.addEventListener("click", ()=>{
      loginInputs.style.transform = "translateX(-100%)";
      registrationInputs.style.transform = "translateX(-100%)";
      loginBtn.style.backgroundColor = "white";
      registrationBtn.style.backgroundColor = "#000000ce";
      loginBtn.style.color = "black";
      registrationBtn.style.color = "white";
      container.style.height = "400px";
    })
  }
}

const login = new LoginClass({
  selector: '.page',
  template: `
    <div class="login-container">
      <div class="login-nav">
        <button class="login-btn">Login</button>
        <button class="registration-btn">Registration</button>
      </div>
      <div class="inputs">
        <form class="login-inputs">
          <label for="login-username">Введите ваше имя</label>
          <input placeholder="login" name="login-username" type="text" class = "login-username hvr-underline-from-center" id="login-username">
          <label for="login-password">Введите ваш пароль</label>
          <input placeholder="password" name="login-password" type="password" class="hvr-underline-from-center" id="login-password">
          <button type="submit" class="login-putter hvr-sweep-to-top">Login</button>
        </form>
        <form  method="post" class="registration-inputs">
          <label for="registration-username">Введите ваше имя</label>
          <input placeholder="login" type="text" class="hvr-underline-from-center" id="registration-username">
          <label for="registration-password--1">Введите ваш пароль</label>
          <input placeholder="password" type="password" class="hvr-underline-from-center" id="registration-password--1" >
          <label for="registration-password--2">Повторите ваш пароль</label>
          <input placeholder="confirm password" type="password" class="hvr-underline-from-center" id="registration-password--2">
          <button class="registration-putter hvr-sweep-to-top">Registration</button>
        </form>
      </div>
    </div>
  `
})



export default login;
