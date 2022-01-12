// eslint-disable-next-line import/no-cycle
import inputForm from '../../app';
import validationCoord from '../validation/validationCoord';

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
      <input placeholder = "[51.12345, - 50.12345]"class="coordinatesText form_input" name="form_input" type="text">
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

  // eslint-disable-next-line class-methods-use-this
  onClickPopUp(event) {
    const { target } = event;
    if (target.classList.contains('form_cancell')) {
      inputForm.coordString = 'Координаты скрыты пользователем';
      this.closepopUp();
    }
    if (target.classList.contains('form_submitBt')) {
      const inputValue = document.getElementsByName('form_input');
      if (validationCoord(inputValue[0].value) === true) {
        inputForm.coordString = inputValue[0].value;
        this.closepopUp();
      } else {
        alert('Координаты введены в неверном формате, введите координаты еще раз');
        inputValue[0].value = '';
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  closepopUp() {
    document.querySelector('.popup').remove();
  }
}
