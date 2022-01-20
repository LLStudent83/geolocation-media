/* eslint-disable class-methods-use-this */
// eslint-disable-next-line import/no-cycle

export default class Gps {
  constructor(popUp) {
    this.popUp = popUp;
  }

  async getСoordinates() { // получает координаты
    let position = null;

    if (!navigator.geolocation) {
      this.popUp.renderingPopUp();
      return;
    }
    const promise = new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((_position) => resolve(_position),
        (e) => reject(e), { timeout: 5000 }); // ожидание координат 5 сек. потом выбросит исключение
    });
    try {
      position = await promise;
    } catch (e) {
      return;
    }

    const { latitude, longitude } = position.coords;
    const coordString = `[${latitude}, ${longitude}]`;
    // eslint-disable-next-line consistent-return
    return coordString;
  }

  showPosition() {
    // eslint-disable-next-line no-alert
    alert('логика отображения местоположени человека на карте ещё не написана SORRY');
  }
}
