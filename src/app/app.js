const component = new ComponentService();
const alert = new AlertService();

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

main(component, alert);