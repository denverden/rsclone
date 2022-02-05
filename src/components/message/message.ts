import './message.scss';

class Message {
  view(text = '', type = 'info', time = 4000) {
    if (text !== '') {
      const toast = document.createElement('div');
      toast.classList.add('message');
      toast.classList.add(type);
      toast.innerHTML = `
        ${text}
        <button type="button" class="message__close">
          <span aria-hidden="true">&times;</span>
        </button>
      `;
      const currentToast = document.querySelector('.page__messages').appendChild(toast);
      setTimeout(() => {
        currentToast.classList.add('message__fade');
        setTimeout(() => {
          currentToast.remove();
        }, 500);
      }, time);
      currentToast.querySelector('.message__close').addEventListener('click', () => {
        currentToast.classList.add('message__fade');
        setTimeout(() => {
          currentToast.remove();
        }, 500);
      });
    }
  }
}

const message = new Message();

export default message;
