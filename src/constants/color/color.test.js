import {COLORS} from './color';
describe('COLORS', () => {
  test('should be defined', () => {
    expect(COLORS).toBeDefined();
  });

  test('should have correct color values', () => {
    expect(COLORS.normal).toEqual('#DDCBD0');
    expect(COLORS.fighting).toEqual('#FCC1B0');
    expect(COLORS.flying).toEqual('#B2D2E8');
    expect(COLORS.poison).toEqual('#CFB7ED');
    expect(COLORS.ground).toEqual('#F4D1A6');
    expect(COLORS.rock).toEqual('#C5AEA8');
    expect(COLORS.bug).toEqual('#C1E0C8');
    expect(COLORS.ghost).toEqual('#D7C2D7');
    expect(COLORS.steel).toEqual('#C2D4CE');
    expect(COLORS.fire).toEqual('#EDC2C4');
    expect(COLORS.water).toEqual('#CBCDED');
    expect(COLORS.grass).toEqual('#C0D4C8');
    expect(COLORS.electric).toEqual('#E2E2A0');
    expect(COLORS.psychic).toEqual('#DDC0CF');
    expect(COLORS.ice).toEqual('#C7D7DF');
    expect(COLORS.dragon).toEqual('#CADCDF');
    expect(COLORS.dark).toEqual('#C6C5E3');
    expect(COLORS.fairy).toEqual('#E4C0CF');
    expect(COLORS.unknown).toEqual('#C0DFDD');
    expect(COLORS.shadow).toEqual('#CACACA');
  });
});
