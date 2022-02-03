import './message.scss';

class Message {
  view(text = '', time = 4000) {
    if (text !== '') {
      const toast = document.createElement('div');
      toast.classList.add('message');
      toast.innerHTML = `
        <div class="message1" role="alert">
          <button type="button" class="close">
            <span aria-hidden="true">&times;</span>
          </button>
          <div class="message__body">${text}</div>
        </div>
      `;
      const currentToast = document.querySelector('.page__messages').appendChild(toast);
      setTimeout(() => {
        currentToast.classList.add('message__fade');
        setTimeout(() => {
          currentToast.remove();
        }, 500);
      }, time);
      currentToast.querySelector('.close').addEventListener('click', () => {
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
