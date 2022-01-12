/* eslint-disable class-methods-use-this */
// eslint-disable-next-line import/no-cycle
import inputForm from '../../app';

export default class Gps {
  constructor(popUp) {
    this.popUp = popUp;
  }

  getСoordinates() {
    if (navigator.geolocation) {
      this.popUp.renderingPopUp();
      return;
    }
    const promise = new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => resolve(position),
        (e) => reject(e), { timeout: 5000 });
    });
    promise.then((position) => this.setCoordinates(position));
    promise.catch(() => this.popUp.renderingPopUp());
  }

  setCoordinates(position) {
    const { latitude, longitude } = position.coords;
    inputForm.coordString = `[${latitude}, ${longitude}]`;
  }
}
