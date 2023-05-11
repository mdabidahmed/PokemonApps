import * as strings from './strings';

describe('strings', () => {
  test('APP_NAME should have the correct value', () => {
    expect(strings.APP_NAME).toBe('Pokemon API App');
  });

  test('WELCOME_MESSAGE should have the correct value', () => {
    expect(strings.WELCOME_MESSAGE).toBe('Welcome to the Pokemon API App!');
  });

  test('SEARCH_PLACEHOLDER should have the correct value', () => {
    expect(strings.SEARCH_PLACEHOLDER).toBe('Search Pokemon name or number');
  });

  test('POKEMON_TITLE should have the correct value', () => {
    expect(strings.POKEMON_TITLE).toBe('Pokemon Description');
  });

  test('POKEMON_DESCRIPTION should have the correct value', () => {
    expect(strings.POKEMON_DESCRIPTION).toBe(
      'Search for any Pokemon that exists on the planet',
    );
  });

  test('POKEMON_ABILITIES should have the correct value', () => {
    expect(strings.POKEMON_ABILITIES).toBe('Abilities');
  });

  test('GENDER should have the correct value', () => {
    expect(strings.GENDER).toBe('Gender(s)');
  });

  test('WEIGHT should have the correct value', () => {
    expect(strings.WEIGHT).toBe('Weight');
  });

  test('HEIGHT should have the correct value', () => {
    expect(strings.HEIGHT).toBe('Height');
  });

  test('TYPES should have the correct value', () => {
    expect(strings.TYPES).toBe('Types');
  });

  test('READ_MORE should have the correct value', () => {
    expect(strings.READ_MORE).toBe('read more');
  });

  test('WEAK_AGAINST should have the correct value', () => {
    expect(strings.WEAK_AGAINST).toBe('Weak Against');
  });

  test('FILTER should have the correct value', () => {
    expect(strings.FILTER).toBe('Filter');
  });

  test('TYPE should have the correct value', () => {
    expect(strings.TYPE).toBe('Type');
  });

  test('APPLY_FILTER should have the correct value', () => {
    expect(strings.APPLY_FILTER).toBe('Apply Filter');
  });

  test('RESET should have the correct value', () => {
    expect(strings.RESET).toBe('Reset');
  });

  test('CHEVROLET_LEFT_ALT_TEXT should have the correct value', () => {
    expect(strings.CHEVROLET_LEFT_ALT_TEXT).toBe(
      'Click button for List of previous 20 Pokemon Card',
    );
  });

  test('CHEVROLET_RIGHT_ALT_TEXT should have the correct value', () => {
    expect(strings.CHEVROLET_RIGHT_ALT_TEXT).toBe(
      'Click button for List of next 20 Pokemon Card',
    );
  });

  test('GO_BACK_LISTING_PAGE_ALT_TEXT should have the correct value', () => {
    expect(strings.GO_BACK_LISTING_PAGE_ALT_TEXT).toBe(
      'Go back to Pokemon Listing Page',
    );
  });

  test('FILTER_ICON_ALT_TEXT should have the correct value', () => {
    expect(strings.FILTER_ICON_ALT_TEXT).toBe(
      'Filter icon for getting result from filter',
    );
  });
});
