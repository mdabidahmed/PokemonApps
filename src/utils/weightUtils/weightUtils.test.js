const {covert_Weight_to_Kg} = require('./weightUtils');
describe('convert_Weight_to_Kg', () => {
  test('should convert weight in grams to kilograms', () => {
    const weightInGrams = 500;
    const expectedWeightInKg = '50 Kg';
    const actualWeightInKg = covert_Weight_to_Kg(weightInGrams);
    expect(actualWeightInKg).toBe(expectedWeightInKg);
  });

  test('should return zero when weight is zero', () => {
    const weightInGrams = 0;
    const expectedWeightInKg = '0 Kg';
    const actualWeightInKg = covert_Weight_to_Kg(weightInGrams);
    expect(actualWeightInKg).toBe(expectedWeightInKg);
  });

  test('should return null when weight is not a number', () => {
    const weightInGrams = 'abc';
    const actualWeightInKg = covert_Weight_to_Kg(weightInGrams);
    expect(actualWeightInKg).toMatch('NaN Kg');
  });
});
