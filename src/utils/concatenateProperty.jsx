export const concatenateProperty = (array, property) => {
  return array.reduce((prev, current) => {
    return prev + current[property] + ' ';
  }, '');
};
