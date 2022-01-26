import Component from '../Component';
import './login.scss'

class LoginClass extends Component{
  afterRender(): void {
    const loginBtn = document.querySelector(".login-btn") as HTMLElement;
    const registrationBtn = document.querySelector(".registration-btn") as HTMLElement;
    const loginInputs = document.querySelector(".login-inputs") as HTMLElement;
    const registrationInputs = document.querySelector(".registration-inputs") as HTMLElement;

    loginBtn.addEventListener("click", (e)=>{
      loginInputs.style.transform = "translateX(0)";
      registrationInputs.style.transform = "translateX(0)";
      loginBtn.style.backgroundColor = "gray";
      registrationBtn.style.backgroundColor = "white";
    })

    registrationBtn.addEventListener("click", (e)=>{
      loginInputs.style.transform = "translateX(-100%)";
      registrationInputs.style.transform = "translateX(-100%)";
      loginBtn.style.backgroundColor = "white";
      registrationBtn.style.backgroundColor = "gray";
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
        <div class="login-inputs">
          <input placeholder="login" type="text" id="login-username">
          <input placeholder="password" type="password" id="login-username">
          <button class="login-putter">Login</button>
        </div>
        <div class="registration-inputs">
          <input placeholder="login" type="text" id="registration-username">
          <input placeholder="password" type="password" id="registration-password--1" >
          <input placeholder="confirm password" type="password" id="registration-password--2">
          <button class="registration-putter">Registration</button>
        </div>
      </div>
    </div>
  `
})



export default login;
