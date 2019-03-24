import {validate} from './utils/validate-inputs';
import {parse} from './utils/parse-inputs';
import {calculate} from './utils/calculate';

export const main = (component, alert) => {  
  function onClick() {
    const input = component.getInput();
    const errors = validate(input);
    if (Object.keys(errors).length > 0) {
      return alert.displayErrors(errors);
    };
    alert.hideErrors();
    const parsedInput = parse(input);
    const result = calculate(parsedInput);
    component.displayResult(result);
  }
  component.setSubmitBehavior(onClick);
}