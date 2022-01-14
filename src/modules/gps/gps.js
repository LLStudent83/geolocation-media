/* eslint-disable class-methods-use-this */
// eslint-disable-next-line import/no-cycle
import inputForm from '../../app';

export default class Gps {
  constructor(popUp) {
    this.popUp = popUp;
  }

  getСoordinates() { // получает координаты
    if (!navigator.geolocation) {
      this.popUp.renderingPopUp();
      return;
    }
    const promise = new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => resolve(position),
        (e) => reject(e), { timeout: 5000 }); // ожидание координат 5 сек. потом выбросит исключение
    });
    promise.then((position) => this.setCoordinates(position));
    promise.catch(() => this.popUp.renderingPopUp());
  }

  setCoordinates(position) { // записывает координаты в виде [51.52658, -0.45263] в переменную
    const { latitude, longitude } = position.coords;
    inputForm.coordString = `[${latitude}, ${longitude}]`;
  }

  showPosition() {
    // eslint-disable-next-line no-alert
    alert('логика отображения местоположени человека на карте ещё не написана SORRY');
  }
}
