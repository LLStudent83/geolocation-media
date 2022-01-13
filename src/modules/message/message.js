export default class Message {
  constructor(messages, popUp, gps) {
    this.messages = messages;
    this.popUp = popUp;
    this.gps = gps;
  }

  static getData() {
    const dateMessage = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString().slice(0, -3)}`;
    return dateMessage;
  }

  createAudioMessage(src, coordinates) {
    console.log('ссылка на аудио', src);
    const html = `
    <div class="messag">
        <div class="messagCont">
          <audio controls class="messag_audio" src="${src}"></audio>
          <div class="messag_geoposition">${coordinates}</div>
        </div>
      <time class="messag_date">${Message.getData()}</time>
    </div>`;
    this.messages.innerHTML += html;
  }

  createTextMessage(text, coordinates) {
    const html = `
        <div class="messag">
          <div class="messagCont">
            <p class="messag_text">${text}</p>
            <div class="messag_geoposition">${coordinates}
            <button class="messag__showPosition"></button>
            </div>
          </div>
          <time class="messag_date">${Message.getData()}</time>
        </div>`;
    this.messages.innerHTML += html;
    this.assignHandler();
  }

  assignHandler() {
    const lastMessage = this.messages.lastElementChild;
    const elementHandl = lastMessage.querySelector('.messag__showPosition');
    elementHandl.addEventListener('click', () => { this.gps.showPosition(); });
  }
}
