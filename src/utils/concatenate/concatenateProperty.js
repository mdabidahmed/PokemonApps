export const concatenateProperty = (array, property) => {
  return array.reduce((prev, current) => {
    const regex = /[\n\r]+/g;
    const result = prev.replace(regex, ' ');
    return result + current[property];
  }, '');
};
