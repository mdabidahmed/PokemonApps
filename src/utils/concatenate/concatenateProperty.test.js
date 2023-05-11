const {concatenateProperty} = require('../concatenate/concatenateProperty');

describe('concatenateProperty', () => {
  test('should concatenate values of a given property from an array of objects', () => {
    const arr = [
      {id: 1, name: 'Alice'},
      {id: 2, name: 'Bob'},
      {id: 3, name: 'Charlie'},
    ];

    const result = concatenateProperty(arr, 'name');

    expect(result).toBe('AliceBobCharlie');
  });

  test('should return an empty string for an empty array', () => {
    const arr = [];

    const result = concatenateProperty(arr, 'name');

    expect(result).toBe('');
  });
});
