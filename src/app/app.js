const target = document.querySelector('.result__target-js');
const submit = document.querySelector('.controls__submit-js')
const numberPattern = /^([0-9]+.)?[0-9]+$/;

function add(...input) {
  return input.reduce((sum, summand) => sum + summand);
}

function process(...input) {
  if (validate(input)) { 
    parsedInput = parse(input);
    return add(parsedInput);
  }
  const message = "invalid input -- please enter two numbers"
  return message;
}

submit.addEventListener('click', () => {
  const a = document.querySelector('.controls__input-a-js').value;
  const b = document.querySelector('.controls__input-b-js').value;
  const result = process(a, b);
  target.innerHTML = result;
});