function validate(...input) {
  return input.every(item => numberPattern.test(item));
}