export function addLeadingZeros(number) {
  if (number.toString().length === 1) {
    return '00' + number;
  } else if (number.toString().length === 2) {
    return '0' + number;
  } else {
    return number.toString();
  }
}
