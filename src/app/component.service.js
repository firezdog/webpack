class ComponentService {
  constructor() {
    this.inputA = document.querySelector('.js-controls__input-a');
    this.inputB = document.querySelector('.js-controls__input-b');
    this.resultTarget = document.querySelector('.js-result');
    this.submitButton = document.querySelector('.js-controls__submit');
  }

  getInput() {
    return [this.inputA.value, this.inputB.value];
  }

  displayResult(result) {
    this.resultTarget.innerHTML = result || '';
  }

  setSubmitBehavior(fn) {
    this.submitButton.addEventListener('click', fn);
  }
  
}