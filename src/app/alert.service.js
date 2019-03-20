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

}