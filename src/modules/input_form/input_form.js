/* eslint-disable no-alert */
export default class InputForm {
  constructor(elem, message, gps, popUp, timer) {
    this.form = elem;
    this.message = message;
    this.gps = gps;
    this.popUp = popUp;
    this.timer = timer;
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
    this.modificationForm('record'); // изменяет вид формы при записи аудио
    const constraints = {
      audio: true,
      video: false,
    };
    try {
      this.stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.recorder = new MediaRecorder(this.stream);
      const chunks = [];
      this.recorder.addEventListener('start', () => {
      });
      this.recorder.addEventListener('dataavailable', (e) => {
        chunks.push(e.data);
      });
      this.recorder.addEventListener('stop', (e) => {
        this.modificationForm('text');
        if (this.recordingResult === 'message') {
          this.stream.getTracks().forEach((track) => track.stop());
          const blob = new Blob(chunks);
          const src = URL.createObjectURL(blob);
          this.message.createAudioMessage(src, this.coordString);
        } else {
          chunks.length = 0;
          this.stream.getTracks().forEach((track) => track.stop());
        }
      });
      this.recorder.start();
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

  modificationForm(state) {
    if (state === 'record') {
      this.soundRecordingButton.remove();
      const htmlAudioRecord = `
      <input class="okAudioRecording buttonForm" type="button" />
      <div class="timer">00:00</div>
      <input class="cansellAudioRecording buttonForm" type="button" />
      `;
      this.form.innerHTML += htmlAudioRecord;
      this.timer.startTimer();
      this.buttonOk = this.form.querySelector('.okAudioRecording');
      this.buttonCansell = this.form.querySelector('.cansellAudioRecording');

      this.buttonOk.addEventListener('click', () => {
        this.recordingResult = 'message';
        this.recorder.stop();
      });
      this.buttonCansell.addEventListener('click', () => {
        this.recordingResult = 'cansellMessage';
        this.recorder.stop();
      });
    }
    if (state === 'text') {
      this.timer.stopTimer();

      this.buttonOk.remove();
      this.buttonCansell.remove();
      this.form.querySelector('.timer').remove();
      const buttonRecordHTML = '<input class="postAudioRecording buttonForm" type="button" />';
      this.form.innerHTML += buttonRecordHTML;
      this.soundRecordingButton = document.querySelector('.postAudioRecording');
      this.soundRecordingButton.addEventListener('click', (e) => this.eventHandler(e));
    }
  }
}
