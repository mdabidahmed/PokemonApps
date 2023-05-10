const {meters_to_feet_and_inches} = require('./lengthUtils');

describe('meters_to_feet_and_inches', () => {
  test('should convert meters to feet and inches', () => {
    const result = meters_to_feet_and_inches(1000 / 10);

    expect(result).toBe('32\' 10"');
  });

  test('should handle zero meters', () => {
    const result = meters_to_feet_and_inches(0);

    expect(result).toBe('0\' 0"');
  });
});
