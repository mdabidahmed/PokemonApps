import {TYPE_SELECTED} from './type';
describe('TYPE_SELECTED', () => {
  test('should have all properties set to false', () => {
    Object.keys(TYPE_SELECTED).forEach(key => {
      expect(TYPE_SELECTED[key]).toBe(false);
    });
  });
});
