import Component from '../Component';
import './login.scss'

const login = new Component({
  selector: '.app',
  template: `
    <div class="login-container">
      <div class="login-nav">
        <button class="login-btn">Login</button>
        <button class="registration-btn">Registration</button>
      </div>
      <div class="login-inputs">
        <input type="text" id="login-username">
        <input type="password" id="login-username">
        <button class="login-putter">Login</button>
      </div>
      <div class="registration-inputs">
        <input type="text" id="registration-username">
        <input type="password" id="registration-password--1" >
        <input type="password" id="registration-password--2">
        <button class="registration-putter">Registration</button>
      </div>
    </div>
  `
})

export default login;
