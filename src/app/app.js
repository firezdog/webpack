const resultTarget = document.querySelector('.result__target-js');
const errorTarget = document.querySelector('.error__target-js');
const submit = document.querySelector('.controls__submit-js');
const numberPattern = /^([0-9]+.)?[0-9]+$/;

function add(input) {
  console.log('adding');
  return input.reduce((sum, summand) => sum + summand);
}

const parse = (input) => {
  console.log('parsing');
  return input.map(item => parseFloat(item));
};

function process(...input) {
  const errors = validate(input);
  if (Object.keys(errors).length > 0) {
    return displayErrors(errors);
  };
  errorTarget.classList.add('hidden');
  parsedInput = parse(input);
  return add(parsedInput);
}

const displayErrors = errors => {
  let message = '';
  Object.values(errors).forEach(error => {
    message += `<p>${error}</p>`;
  });
  errorTarget.innerHTML = message;
  errorTarget.classList.remove('hidden');
}

function validate(input) {
  const errors = {};
  input.forEach(item => {
    if (numberPattern.test(item)) {
      return;
    }
    errors[item] = `${item} is not a number.`;
  });
  return errors;
}

submit.addEventListener('click', () => {
  const a = document.querySelector('.controls__input-a-js').value;
  const b = document.querySelector('.controls__input-b-js').value;
  const result = process(a, b);
  resultTarget.innerHTML = result || '';
});