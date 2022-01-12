export default class Message {
  constructor(messages, popUp) {
    this.messages = messages;
    this.popUp = popUp;
  }

  static getData() {
    const dateMessage = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString().slice(0, -3)}`;
    return dateMessage;
  }

  async createAudioMessage(src, coordinates) {
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

  async createTextMessage(text, coordinates) {
    const html = `
        <div class="messag">
          <div class="messagCont">
            <p class="messag_text">${text}</p>
            <div class="messag_geoposition">${coordinates}</div>
          </div>
          <time class="messag_date">${Message.getData()}</time>
        </div>`;
    this.messages.innerHTML += html;
  }
}
