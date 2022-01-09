/* eslint-disable no-alert */
export default class InputForm {
  constructor(elem, message) {
    this.message = message;
    this.form = elem;
    this.textarea = document.querySelector('.formText');
    this.soundRecordingButton = document.querySelector('.postAudioRecording');
    this.form.addEventListener('keydown', (e) => this.eventHandler(e));
    this.soundRecordingButton.addEventListener('click', (e) => this.eventHandler(e));
  }

  eventHandler(e) {
    const { target, key } = e;
    if (target === this.textarea && key === 'Enter') this.message.createTextMessage(this.textarea.value);
    if (target === this.soundRecordingButton) this.soundRecord();
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
        this.message.createAudioMessage(src);
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
}
