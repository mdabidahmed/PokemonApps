import {URL, URL_GENDER} from './url';

describe('Constants', () => {
  test('URL should be "https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal"', () => {
    expect(URL).toEqual(
      'https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal',
    );
  });

  test('URL_GENDER should be an array with three string values', () => {
    expect(Array.isArray(URL_GENDER)).toBeTruthy();
    expect(URL_GENDER.length).toEqual(3);
    expect(typeof URL_GENDER[0]).toEqual('string');
    expect(typeof URL_GENDER[1]).toEqual('string');
    expect(typeof URL_GENDER[2]).toEqual('string');
  });
});
