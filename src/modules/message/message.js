export default class Message {
  constructor(messages, gps) {
    this.messages = messages;
    this.gps = gps;
  }

  static getData() {
    const dateMessage = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString().slice(0, -3)}`;
    return dateMessage;
  }

  createAudioMessage(src) {
    console.log('ссылка на аудио', src);
    const coordinates = this.gps.getСoordinates();
    const html = `
    <div class="messag">
        <div class="messagCont">
          <audio controls class="messag_audio" src="${src}"></audio>
          <div class="messag_geoposition">[51.52658, -0.45263][${coordinates}]</div>
        </div>
      <time class="messag_date">${Message.getData()}</time>
    </div>`;
    this.messages.innerHTML += html;
  }

  createTextMessage(text) {
    const coordinates = this.gps.getСoordinates();
    const html = `
        <div class="messag">
          <div class="messagCont">
            <p class="messag_text">${text}</p>
            <div class="messag_geoposition">[51.52658, -0.45263][${coordinates}]</div>
          </div>
          <time class="messag_date">${Message.getData()}</time>
        </div>`;
    this.messages.innerHTML += html;
  }
}
