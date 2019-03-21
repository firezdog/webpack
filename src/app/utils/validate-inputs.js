const validate = (input) => {
  const numberPattern = /^([0-9]+.)?[0-9]+$/;
  const errors = {};
  input.forEach(item => {
    if (numberPattern.test(item)) {
      return;
    }
    errors[item] = `"${item}" is not a number.`;
  });
  return errors;
};