/* eslint-disable no-alert */
export default class InputForm {
  constructor(elem, message, gps, popUp) {
    this.form = elem;
    this.message = message;
    this.gps = gps;
    this.popUp = popUp;
    this.textarea = document.querySelector('.formText');
    this.soundRecordingButton = document.querySelector('.postAudioRecording');
    this.form.addEventListener('keydown', (e) => this.eventHandler(e));
    this.soundRecordingButton.addEventListener('click', (e) => this.eventHandler(e));
    this.getCoordinates();
  }

  eventHandler(e) {
    const { target, key } = e;
    if (target === this.textarea && key === 'Enter') {
      e.preventDefault();
      this.createTextMessage(this.textarea.value);
      return;
    }
    if (target === this.soundRecordingButton) {
      this.soundRecord();
    }
  }

  async soundRecord() {
    if (!navigator.mediaDevices) {
      alert('Ваше устройство не поддерживаетс запись звука. Зайдите в приложение с другого устройства');
      return;
    }
    const constraints = {
      audio: true,
      video: false,
    };
    try {
      this.stream = await navigator.mediaDevices.getUserMedia(constraints);
      const recorder = new MediaRecorder(this.stream);
      const chunks = [];
      recorder.addEventListener('start', (e) => {
        console.log('запись началась', e);
      });
      recorder.addEventListener('dataavailable', (e) => {
        console.log('dataavailable', e.data);
        chunks.push(e.data);
      });
      recorder.addEventListener('stop', (e) => {
        console.log('stop', e);
        const blob = new Blob(chunks);
        const src = URL.createObjectURL(blob);
        this.message.createAudioMessage(src, this.coordString); // сюда же передать координаты
      });
      recorder.start();
      setTimeout(() => {
        recorder.stop();
        this.stream.getTracks().forEach((track) => track.stop());
      }, 5000);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }

  createTextMessage(text) {
    this.message.createTextMessage(text, this.coordString);
    this.textarea.value = '';
  }

  // eslint-disable-next-line class-methods-use-this
  getCoordinates() {
    this.gps.getСoordinates();
  }
}
