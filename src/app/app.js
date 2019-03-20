const resultTarget = document.querySelector('.js-result');
const errorTarget = document.querySelector('.js-error');
const submit = document.querySelector('.js-controls__submit');

function process(...input) {
  const errors = validate(input);
  if (Object.keys(errors).length > 0) {
    return displayErrors(errors);
  };
  // hideErrors
  parsedInput = parse(input);
  return add(parsedInput);
}

submit.addEventListener('click', () => {
  const a = document.querySelector('.js-controls__input-a').value;
  const b = document.querySelector('.js-controls__input-b').value;
  const result = process(a, b);
  resultTarget.innerHTML = result || '';
});