const {addLeadingZeros} = require('./leadingZeros');

describe('addLeadingZeros', () => {
  test('should add two leading zeros to single-digit numbers', () => {
    const result = addLeadingZeros(5);

    expect(result).toBe('005');
  });

  test('should add one leading zero to double-digit numbers', () => {
    const result = addLeadingZeros(23);

    expect(result).toBe('023');
  });

  test('should not modify numbers with three or more digits', () => {
    const result = addLeadingZeros(456);

    expect(result).toBe('456');
  });

  test('should handle negative numbers', () => {
    const result = addLeadingZeros(-5);

    expect(result).toBe('0-5');
  });

  test('should handle zero', () => {
    const result = addLeadingZeros(0);

    expect(result).toBe('000');
  });
});
