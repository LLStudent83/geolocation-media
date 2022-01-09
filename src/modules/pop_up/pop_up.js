export default class PopUp {
  constructor() {
    this.container = document.querySelector('.container');
  }

  // eslint-disable-next-line class-methods-use-this
  getHTMLPopUp() {
    const HTML = `
    <form class="form" action="">
    <h1 class="form_Name">что то пошло не так</h1>
    <section class="textmessage">
      <p>
        К сожалению нам не удалось определить ваше местоположение, пожалуйста,
        дайте разрешение на использование геолокации, либо введите координаты
        вручную.
      </p>
      <p>Широта и долгота через запятую</p>
    </section>
    <footer class="form_footer">
      <input class="coordinatesText form_input" type="text">
      <button type="button" class="form_cancell button">Отмена</button>
      <button type="submit" class="form_submitBt button">Ok</button>
    </footer>
  </form>`;
    return HTML;
  }

  renderingPopUp() {
    const containerForm = document.createElement('div');
    containerForm.className = 'popup';
    this.container.append(containerForm);
    containerForm.innerHTML = this.getHTMLPopUp();
    const popUpButtons = containerForm.querySelectorAll('button');
    for (const element of popUpButtons) {
      element.addEventListener('click', (event) => {
        event.preventDefault();
        this.onClickPopUp(event);
      });
    }
  }

  onClickPopUp(event) {
    const { target } = event;
    if (target.classList.contains('form_cancell')) // вернуть строку с пустыми координатами;
    if (target.classList.contains('form_submitBt'))// вернуть координаты из поля input;
  }

  // eslint-disable-next-line class-methods-use-this
  closepopUp() {
    document.querySelector('.popup').remove();
  }
}
