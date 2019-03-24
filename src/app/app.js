import {parse} from './utils/parse-inputs';
import {calculate} from './utils/calculate';

function displayResult(input, component) {
  const parsedInput = parse(input);
  const result = calculate(parsedInput);
  component.displayResult(result);
}

function onClick(component, alert) {
  const input = component.getInput();
  alert.check(input);
  displayResult(input,  component);
}

export const main = (component, alert) => {  
  component.setSubmitBehavior(onClick.bind(null, component, alert));
}