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
