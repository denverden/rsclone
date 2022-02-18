import Component from '../component';
import './race.scss';
class Race extends Component {
  raceImg() {
    const images = ['snow.svg', 'night.svg', 'rain1.svg', 'street2.svg'];
    const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
    const min = 0;
    const max = 3;
    const index = random(min, max);
    const block = document.getElementById('block');
    block.style.backgroundImage = `url('./assets/images/${images[index]}')`;
  }

  afterRender() {
    this.raceImg();
  }
}

const race = new Race({
  selector: '.race',
  template: '<div id="block" class="race__street"></div><div class="race__road"></div>',
});

export default race;
