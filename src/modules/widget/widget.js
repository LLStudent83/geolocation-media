export default class Widget {
  constructor(contaner) {
    if (typeof contaner === 'string') {
      this.contaner = document.querySelector('.contaner');
    } else {
      this.contaner = contaner;
    }
    this.blockText = this.contaner.querySelector('.text');
    this.button = document.querySelector('.collapseBtn');
    this.button.addEventListener('click', () => this.showText());
  }

  showText() {
    this.blockText.classList.toggle('textShow');
    this.blockText.classList.toggle('textHiden');
  }
}
