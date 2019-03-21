import {validate} from './utils/validate-inputs.js';
import {parse} from './utils/parse-inputs.js';
import {calculate} from './utils/calculate.js'

main = (component, alert) => {  
  function onClick() {
    const input = component.getInput();
    const errors = validate(input);
    if (Object.keys(errors).length > 0) {
      return alert.displayErrors(errors);
    };
    alert.hideErrors();
    parsedInput = parse(input);
    const result = calculate(parsedInput);
    component.displayResult(result);
  }
  component.setSubmitBehavior(onClick);
}