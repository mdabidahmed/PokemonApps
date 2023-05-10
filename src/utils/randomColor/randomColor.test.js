const {generateRandomColor} = require('./randomColor');
const {badgeColorTokens} = require('../../tokens/colors');

describe('generateRandomColor', () => {
  test('should return a random color from the badgeColorTokens array', () => {
    const mockMath = Object.create(global.Math);
    mockMath.random = () => 0.5;
    global.Math = mockMath;
    const result = generateRandomColor();
    expect(badgeColorTokens).toContain(result);
  });
});
