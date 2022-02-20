/* eslint-disable max-len */
import Component from '../component';
import './garage.scss';
import car5 from './img/car5.svg';
import car3 from './img/car3.svg';
import car7 from './img/car7.svg';
import car15 from './img/car15.svg';
import car8 from './img/car8.svg';

class Garage extends Component {
  animCar() {
    document.querySelector('.car').classList.toggle('active');
  }

  ready() {
    const carImg = document.getElementById('car');
    const modalAuth = document.createElement('div');
    carImg.append(modalAuth);
    modalAuth.innerHTML = `
      <div class="car" style="width:350px;margin: 0 auto">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 250 83">
      <path class="body" fill="#89CA86" d="M69.434 71.087h172.9c4.1 0 7.5-3.4 7.5-7.5v-13c0-4.9-2.7-9.4-7-11.7-10.6-5.7-34.2-13.9-56.1-14.2-24.9-13.2-47.2-23.9-63-24.2-15.8-.4-48.9-4.1-93.5 17.4-10.7 1.5-20 .9-21.8.4-1.9-.6-9.5 9.3-6.3 15.8s-.4 13.9-1.9 20.5 4.4 10 11.9 11.9c7.5 1.9 57.3 4.6 57.3 4.6z"/>
      <path fill="#fff" fill-opacity=".1" d="M30.234 17.887c-1 .1-2 .3-3 .4 21.5 3.4 40.3 12.1 75.6 18.2 45.7 7.9 77.4-10.3 83.9-11.7-24.9-13.2-47.2-23.9-63-24.2-15.7-.5-48.8-4.2-93.5 17.3z"/>
      <path fill="#000" fill-opacity=".15" d="M190.135 67.087h-109.7c-13.5 0-64-12.3-78.6-18.3-.5 1.9-1.1 3.8-1.5 5.7-1.5 6.6 4.4 10 11.9 11.9 7.5 1.9 57.3 4.7 57.3 4.7h172.9c2.9 0 5.4-1.6 6.6-4h-58.9z"/>
      <path fill="#181A1C" d="M70.872 71.128a20.04 20.04 0 0 0 .953-9.27 20.205 20.205 0 0 0-3.35-8.725 20.804 20.804 0 0 0-6.958-6.377 21.46 21.46 0 0 0-18.549-1.197 20.994 20.994 0 0 0-7.759 5.427 20.349 20.349 0 0 0-4.496 8.218 20.026 20.026 0 0 0-.306 9.312L49.5 70l21.372 1.128zM221.068 71.188a21.012 21.012 0 0 0-3.173-18.66 20.998 20.998 0 0 0-26.363-6.272 21.002 21.002 0 0 0-10.597 24.94L200 71l21.068.188z"/>
      <g class="well1">
        <path fill="#424449" d="M51.035 82.587c9.72 0 17.6-7.88 17.6-17.6 0-9.72-7.88-17.6-17.6-17.6-9.72 0-17.6 7.88-17.6 17.6 0 9.72 7.88 17.6 17.6 17.6z"/>
        <path fill="#F4F4F4" d="M51.035 79.087c7.787 0 14.1-6.313 14.1-14.1 0-7.788-6.313-14.1-14.1-14.1-7.788 0-14.1 6.312-14.1 14.1 0 7.787 6.312 14.1 14.1 14.1z"/>
        <path fill="#32353A" d="M47.234 65.287c.4 0 .7-.2.8-.6.1-.4-.2-.7-.5-.8l-8.9-2.2c-.2.8-.4 1.7-.4 2.6l9 1zM48.135 67.687c.3-.2.4-.6.2-.9-.2-.3-.6-.4-.9-.3l-8.1 4c.4.8.8 1.5 1.3 2.2l7.5-5zM48.134 62.886c.3.3.7.3.9.1.3-.2.3-.6.1-.9l-5.5-7.6c-.7.5-1.4 1.1-2 1.7l6.5 6.7zM47.934 77.487l2.5-8.5c.1-.4-.1-.7-.4-.8-.3-.1-.7 0-.9.4l-3.6 8.1c.7.3 1.5.6 2.4.8zM54.434 63.987c-.4.1-.6.4-.5.8.1.4.4.6.8.6l9.1-1c0-.9-.2-1.8-.4-2.6l-9 2.2zM52.934 68.487c-.1-.3-.5-.5-.9-.4-.3.1-.5.5-.4.8l2.5 8.5c.9-.2 1.7-.5 2.4-.9l-3.6-8zM51.734 61.587l.6-9.4c-.4 0-.9-.1-1.3-.1s-.9 0-1.3.1l.6 9.4c0 .4.3.6.7.6.3.1.6-.2.7-.6zM62.634 70.487l-8.1-4c-.3-.2-.7 0-.9.3-.2.3-.1.7.2.9l7.5 5c.4-.7.9-1.4 1.3-2.2zM52.934 62.987c.3.2.7.2.9-.1l6.5-6.7c-.6-.6-1.3-1.2-2-1.7l-5.5 7.6c-.2.2-.2.7.1.9z"/>
        <path fill="#57585E" d="M51.034 66.187a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM51.034 67.386a.3.3 0 1 0 0-.6.3.3 0 0 0 0 .6zM49.34 66.105a.3.3 0 1 0-.186-.571.3.3 0 0 0 .185.57zM50.113 63.891a.3.3 0 1 0-.353-.485.3.3 0 0 0 .353.485zM52.373 63.828a.3.3 0 1 0-.485-.352.3.3 0 0 0 .485.352zM53.091 65.862a.3.3 0 1 0-.57-.185.3.3 0 0 0 .57.185z"/>
      </g>
      <g class="well2">
        <path fill="#424449" d="M200.834 82.587c9.721 0 17.6-7.88 17.6-17.6 0-9.72-7.879-17.6-17.6-17.6-9.72 0-17.6 7.88-17.6 17.6 0 9.72 7.88 17.6 17.6 17.6z"/>
        <path fill="#F4F4F4" d="M200.834 79.087c7.788 0 14.1-6.313 14.1-14.1 0-7.788-6.312-14.1-14.1-14.1-7.787 0-14.1 6.312-14.1 14.1 0 7.787 6.313 14.1 14.1 14.1z"/>
        <path fill="#32353A" d="M197.134 65.287c.4 0 .7-.2.8-.6.1-.4-.2-.7-.5-.8l-8.9-2.2c-.2.8-.4 1.7-.4 2.6l9 1zM198.034 67.687c.3-.2.4-.6.2-.9-.2-.3-.6-.4-.9-.3l-8.1 4c.4.8.8 1.5 1.3 2.2l7.5-5zM198.034 62.886c.3.3.7.3.9.1.3-.2.3-.6.1-.9l-5.5-7.6c-.7.5-1.4 1.1-2 1.7l6.5 6.7zM197.834 77.487l2.5-8.5c.1-.4-.1-.7-.4-.8-.3-.1-.7 0-.9.4l-3.6 8.1c.7.3 1.5.6 2.4.8zM204.334 63.987c-.4.1-.6.4-.5.8.1.4.4.6.8.6l9.1-1c0-.9-.2-1.8-.4-2.6l-9 2.2zM202.734 68.487c-.1-.3-.5-.5-.9-.4-.3.1-.5.5-.4.8l2.5 8.5c.9-.2 1.7-.5 2.4-.9l-3.6-8zM201.534 61.587l.6-9.4c-.4 0-.9-.1-1.3-.1s-.9 0-1.3.1l.6 9.4c0 .4.3.6.7.6.4.1.7-.2.7-.6zM212.434 70.487l-8.1-4c-.3-.2-.7 0-.9.3-.2.3-.1.7.2.9l7.5 5c.5-.7 1-1.4 1.3-2.2zM202.834 62.987c.3.2.7.2.9-.1l6.5-6.7c-.6-.6-1.3-1.2-2-1.7l-5.5 7.6c-.3.2-.2.7.1.9z"/>
        <path fill="#57585E" d="M200.834 66.187a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM200.835 67.386a.3.3 0 1 0 0-.6.3.3 0 0 0 0 .6zM199.15 66.131a.3.3 0 1 0 0 0zM199.923 63.953a.3.3 0 1 0-.354-.485.3.3 0 0 0 .354.485zM202.205 63.89a.3.3 0 1 0-.487-.352.3.3 0 0 0 .487.352zM202.97 65.831a.3.3 0 1 0-.57-.185.3.3 0 0 0 .57.185z"/>
      </g>
      <path fill="#000" fill-opacity=".5" d="M238.535 52.187c-1.3 0-2.2 1.3-1.7 2.5l4.2 9.9c.3.7.9 1.1 1.7 1.1h6.8c.2-.7.3-1.4.3-2.2v-11.4h-11.3v.1zM177.435 26.087h-.6c0 .3.3 28.8-2.4 41h-56.6c3.2-18.7-3-43.3-3-43.5l-.5.1c.1.2 6.2 24.8 3 43.4h-37c-3.1-9.6-6.3-15.7-13.8-25.9-3.7-5.2-9-15.9-8.4-19.7l-.5-.1c-.7 3.9 4.6 14.8 8.5 20.1 7.4 10.3 10.6 16.3 13.7 25.9l.3.2h94.6l.3-.2c2.8-12.1 2.4-41 2.4-41.3z"/>
      <path fill="#3D3036" d="M180.534 27.587c1.5.1 2-2 .7-2.7-20.3-10.5-40.4-19.7-54.2-20-1.2 0-2.4-.1-3.8-.1-3.3-.1-7.1-.2-11.4-.2-18 0-35.1 2.4-51.7 7.3-3.2 1-5.3 4.2-4.8 7.5.3 1.7 1.7 3 3.4 3.1l121.8 5.1z"/>
      <path class="glass" fill="#695C61" d="M76.634 9.387c10.5-2 21.2-3.1 32.4-3.3.9 0 1.7.6 1.8 1.5l2.4 13.5c.2 1.1-.7 2.2-1.9 2.1l-32.9-1.4c-.8 0-1.6-.7-1.7-1.5l-1.6-8.9c-.1-.9.5-1.8 1.5-2zm45.9 14.3l57.7 2.4c-18.5-9.6-39.2-19.4-53.3-19.7-1.2 0-2.4-.1-3.8-.1-.9 0-1.9-.1-2.9-.1-1.1 0-2 1-1.8 2.1l2.4 13.9c.2.8.9 1.4 1.7 1.5zm-52-11c-.2-1-1.2-1.7-2.2-1.4-2.6.6-5.2 1.3-7.7 2.1-2.5.7-4.1 3.3-3.7 5.9.1 1 1 1.8 2 1.8l11 .5c1.2 0 2.1-1 1.9-2.1l-1.3-6.8z"/>
      <path fill="#424449" d="M169.834 25.987l2.1 2.3c.6.7.1 1.8-.8 1.8h-3.1c-.3 0-.6-.1-.8-.4l-2.8-3.2 5.4-.5z"/>
      <path class="body" fill="#89CA86" d="M158.334 23.587v1.7c0 1.3 1.1 2.4 2.4 2.4h7.9c1.5 0 2.6-1.2 2.6-2.6 0-1-.5-1.9-1.3-2.5l-3.1-2.3c-.9-.6-2-.8-3-.4l-4 1.5c-.9.3-1.5 1.2-1.5 2.2z"/>
      <path fill="#717175" fill-opacity=".4" d="M169.934 22.487l-3.1-2.3c-.9-.6-2-.8-3-.4l-1.5.6 2.9 2.1c.8.6 1.3 1.5 1.3 2.5 0 1.5-1.2 2.6-2.6 2.6h4.7c1.5 0 2.6-1.2 2.6-2.6 0-1-.5-1.9-1.3-2.5z"/>
      <path fill="#847A7E" d="M124.435 23.787l7.8.3 7.6-15.5c-2.5-.7-4.9-1.2-7.1-1.6l-8.3 16.8zM144.034 9.887c-.6-.2-1.299-.4-1.899-.6l-7.301 14.9 2.2.1 7-14.4zM102.834 6.287c-.8 0-1.5.1-2.3.1l-7.8 16 2.2.1 7.9-16.2zM97.734 6.587c-2.8.2-5.6.5-8.3.8l-7.1 14.6 7.8.3 7.6-15.7z"/>
      <path fill="#000" fill-opacity=".25" d="M73.834 71.087c.5-1.9.8-4 .8-6.1 0-13.1-10.6-23.7-23.7-23.7s-23.7 10.6-23.7 23.7c0 1.1.1 2.2.2 3.2l3 .3c-.2-1.1-.3-2.3-.3-3.5 0-11.4 9.3-20.7 20.7-20.7 11.4 0 20.7 9.3 20.7 20.7 0 2.1-.3 4.2-.9 6.1h3.2zM200.834 41.386c-13.1 0-23.7 10.6-23.7 23.7 0 2.1.3 4.1.8 6.1h3.1c-.6-1.9-.9-4-.9-6.1 0-11.4 9.3-20.7 20.7-20.7 11.4 0 20.7 9.3 20.7 20.7 0 2.1-.3 4.2-.9 6.1h3.1c.5-1.9.8-4 .8-6.1 0-13.1-10.6-23.7-23.7-23.7z"/>
      <path fill="#000" fill-opacity=".15" d="M129.534 36.386c2.044 0 3.7-1.164 3.7-2.6 0-1.435-1.656-2.6-3.7-2.6-2.043 0-3.7 1.165-3.7 2.6 0 1.436 1.657 2.6 3.7 2.6z"/>
      <path fill="#695C61" d="M132.935 32.587h-6.8c-.6 0-1.2.5-1.2 1.2 0 .6.5 1.2 1.2 1.2h6.8c.6 0 1.2-.5 1.2-1.2-.1-.6-.6-1.2-1.2-1.2z"/>
      <path fill="#000" fill-opacity=".15" d="M73.334 33.787c2.044 0 3.7-1.164 3.7-2.6 0-1.436-1.656-2.6-3.7-2.6-2.043 0-3.7 1.164-3.7 2.6 0 1.436 1.657 2.6 3.7 2.6z"/>
      <path fill="#695C61" d="M76.734 29.987h-6.8c-.6 0-1.2.5-1.2 1.2 0 .6.5 1.2 1.2 1.2h6.8c.6 0 1.2-.5 1.2-1.2s-.5-1.2-1.2-1.2z"/>
      <path fill="#3D3036" d="M15.534 33.087l4.3-5c1.1-1.3.2-3.2-1.5-3.2h-15.6c-1.3 2.8-1.9 6.1-.7 8.9h12c.6 0 1.1-.2 1.5-.7z"/>
      <path fill="#F26F75" d="M19.035 26.487c-.1-.1-.3-.5-.8-.5h-16.1c-.8 2.2-1.2 4.5-.6 6.6h12.4c.2 0 .5-.1.6-.3l4.3-5c.4-.2.3-.6.2-.8z"/>
      <path fill="#FCD9DC" d="M10.534 26.587h-6.8c-.5 0-.9.4-.9.9s.4.9.9.9h6.8c.5 0 .9-.4.9-.9s-.4-.9-.9-.9z"/>
      <path fill="#3D3036" d="M245.034 50.287c-.4 0-.8-.1-1.2-.2l-16.7-6.7c-1.2-.5-1.9-1.8-1.5-3.1.3-1.1 1.3-1.8 2.4-1.8h.1l12.3.7c2.1.1 4 1.2 5.1 3l2 3.2c.7 1.1.7 2.5-.1 3.5-.4.9-1.4 1.4-2.4 1.4z"/>
      <path fill="#EDEDED" d="M245.035 42.587l2 3.2c.5.8.5 1.9-.1 2.7-.6.9-1.8 1.3-2.9.9l-16.7-6.7c-.9-.3-1.3-1.3-1.1-2.2.2-.8 1-1.3 1.8-1.3l12.3.7c2 .1 3.7 1.1 4.7 2.7z"/>
      <path fill="#EDE5A5" d="M239.834 46.187c0-2.3-.6-4.5-1.6-6.4l-10-.6c-.8 0-1.6.5-1.8 1.3-.3.9.2 1.8 1.1 2.2l12.3 4.9c-.1-.5 0-.9 0-1.4z"/>
      <path fill="#F26F75" d="M229.887 39.1l-2-.1c-.8 0-1.6.5-1.8 1.3-.3.9.2 1.8 1.1 2.2l3.9 1.5c-.2-1.7-.6-3.3-1.2-4.9z"/>
      <path fill="#fff" fill-opacity=".25" d="M142.835 26.887l-22.1-.9c-.4 0-.7.3-.7.7 0 .4.3.7.7.7l22.1.9c.4 0 .7-.3.7-.7 0-.4-.3-.7-.7-.7zM89.335 24.687l-22.1-.9c-.4 0-.7.3-.7.7 0 .4.3.7.7.7l22.1.9c.4 0 .7-.3.7-.7 0-.3-.3-.7-.7-.7z"/>
    </svg></div>`;

    document.querySelector('.car').addEventListener('click', this.animCar);
  }

  readyPaint() {
    const carImg = document.getElementById('car');
    const modalAuth = document.createElement('div');
    carImg.append(modalAuth);
    modalAuth.innerHTML = `
    <div style="color" class="wrapper-body active-wrap">Body:
    <input id="body" type="color" value="#89CA86" />
    <button class="button" type="submit">Create</button>
    </div>
      `;

    document.querySelector('#body').addEventListener('input', (event: any) => {
      console.log(document.querySelectorAll('.body'));
      document.querySelectorAll('.body').forEach((patch) => {
        patch.setAttribute('style', `fill: ${event.target.value}`);
      });
    });
  }

  readyGlasses() {
    const carImg = document.getElementById('car');
    const modalAuth = document.createElement('div');
    carImg.append(modalAuth);
    modalAuth.innerHTML = `
    <div style="color" class="wrapper-glass active-wrap" >Glass:
      <input id="glass" type="color" value="#695C61" />
      <button class="button" type="submit">Create</button>
      </div>
      `;

    document.querySelector('#glass').addEventListener('input', (event: any) => {
      document.querySelectorAll('.glass').forEach((patch) => {
        patch.setAttribute('style', `fill: ${event.target.value}`);
      });
    });
  }

  painting() {
    const paintingButton = document.querySelector('.depot__nav-ul');
    const depotButton = document.querySelector('.depot__button');
    const variantsWrap = document.querySelector('.variants-wrap-container');
    const dataToggle = document.querySelector('.depot__button[data-toggle="paint"]');
    dataToggle.addEventListener('click', (event) => {
      // const wrapperGlass = document.querySelector('.wrapper-glass');
      // wrapperGlass.classList.remove('active-wrap');
      variantsWrap.classList.remove('active-wrap');
      depotButton.classList.remove('depot--active');
      this.ready();
      this.readyPaint();
    });
    const dataToggleGlasses = document.querySelector('.depot__button[data-toggle="glasses"]');
    dataToggleGlasses.addEventListener('click', (event) => {
      const wrapperBody = document.querySelector('.wrapper-body');
      wrapperBody.classList.remove('active-wrap');
      variantsWrap.classList.remove('active-wrap');
      depotButton.classList.remove('depot--active');
      this.readyGlasses();
    });
  }

  radio() {
    const variants = document.querySelector('.variants');

    variants.addEventListener('click', (event) => {
      console.log(event);
      const { target } = event;
      const targetValue = (target as HTMLInputElement).value;
      console.log(targetValue);
      const carImg = document.querySelector('.car-img__img');
      if (targetValue === 'sedan') {
        (carImg as HTMLImageElement).src = './assets/images/car5.svg';
      } else if (targetValue === 'hatchback') {
        (carImg as HTMLImageElement).src = './assets/images/car3.svg';
      } else if (targetValue === 'convertible') {
        (carImg as HTMLImageElement).src = './assets/images/car7.svg';
      } else if (targetValue === 'smart') {
        (carImg as HTMLImageElement).src = './assets/images/car15.svg';
      } else if (targetValue === 'vehicle') {
        (carImg as HTMLImageElement).src = './assets/images/car8.svg';
      }
    });
  }

  afterRender() {
    this.radio();
    this.painting();
  }
}
const garage = new Garage({
  selector: `.page__main`,
  template: `<div class="parallax-bg garage-parallax"></div>
            <div class="main-acc-container garage-container background">
						<section class="depot">
						<div class="wrapper-content">
							<nav class="depot__nav">
								<ul class="depot__nav-ul">
									<li class="depot__item ">
										<button class="depot__button depot--active" data-toggle="case">Кузов</button>
									</li>
									<li class="depot__item">
										<button  class="depot__button" data-toggle="paint">Краска</button>
									</li>
									<li class="depot__item">
										<button class="depot__button" data-toggle="glasses">Стекла</button>
									</li>
									<li class="depot__item">
										<button class="depot__button" data-toggle="disk">Диски</button>
									</li>
								</ul>
							</nav>
							<div class="variants-wrap-container active-wrap">
							<div class="variants-wrap">
								<div class="variants">
									<h4 class="variants__title">Варианты: </h4>
									<div class="variants__group">
										<div class="radio radio--active">
											<label class="radio__label">
												<input class="radio__input" type="radio" name="body" id="sedan"  value="sedan" checked="checked">
												<img class="radio__img" src="${car5}"  alt="car5">
												<b class="radio__title">Седан</b>
												— бесплатно
											</label>
										</div>
										<div class="radio ">
											<label class="radio__label">
												<input class="radio__input" type="radio" name="body" id="hatchback" value="hatchback" >
												<img class="radio__img" src="${car3}"  alt="car3">
												<b class="radio__title">Хэтчбек</b>
												<span class="price">
													<span>300</span> <small>опыта </small>
													<a class="radio__buy" href="#">купить</a>
												</span>
											</label>
										</div>
										<div class="radio ">
											<label class="radio__label">
												<input class="radio__input" type="radio" name="body" id="convertible" value="convertible" >
												<img class="radio__img" src="${car7}"  alt="car7">
												<b class="radio__title">Кабриолет</b>
												<span class="price">
													<span>300</span> <small>опыта </small>
													<a class="radio__buy" href="#">купить</a>
												</span>
											</label>
										</div>
										<div class="radio">
											<label class="radio__label">
												<input class="radio__input" type="radio" name="body" id="smart" value="smart" >
												<img class="radio__img" src="${car15}"  alt="car15">
												<b class="radio__title">Смарт</b>
												<span class="price">
													<span>300</span> <small>опыта </small>
													<a class="radio__buy" href="#">купить</a>
												</span>
											</label>
										</div>
										<div class="radio">
											<label class="radio__label">
												<input class="radio__input" type="radio" name="body"  id="vehicle" value="vehicle" >
												<img class="radio__img" src="${car8}" alt="car8">
												<b class="radio__title">Внедорожник</b>
												<span class="price">
													<span>300</span> <small>опыта </small>
													<a class="radio__buy" href="#">купить</a>
												</span>
											</label>
										</div>

									</div>
								</div>
								<div class="car-img">
									<img class="car-img__img"src="${car5}" alt="car5">
								</div>
							</div>
							<div class="depot__save">
								<a href="#" class="depot__button depot__button--save" data-toggle="tab">Сохранить изменения</a>
							</div>
              </div>
						</div>
						<div id="car" class="depot__car"></div>
					</section>
            </div>

`,
});

export default garage;
