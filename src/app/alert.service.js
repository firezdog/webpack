import {validate} from './utils/validate-inputs';

export class AlertService {

  constructor() {
    this.errorTarget = document.querySelector('.js-error');
  }

  displayErrors(errors) {
    let message = '';
    Object.values(errors).forEach(error => {
      message += `<p>${error}</p>`;
    });
    this.errorTarget.innerHTML = message;
    this.errorTarget.classList.remove('hidden');
  }

  hideErrors() {
    this.errorTarget.classList.add('hidden');
  }

  check(input) {
    const errors = validate(input);
    if (Object.keys(errors).length > 0) {
      return this.displayErrors(errors);
    };
    this.hideErrors();
  }

}