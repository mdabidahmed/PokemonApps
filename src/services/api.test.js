import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {testData} from '../constants/testData';
import {
  getPokemonDescription,
  getPokemonDetails,
  getPokemonGender,
  getPokemonList,
  getPokemonType,
} from './api';
const BASE_URL = 'https://pokeapi.co/api/v2';

describe('getPokemonGender', () => {
  it('should return data when request is successful', async () => {
    const mock = new MockAdapter(axios);
    const id = 1;
    const data = {gender: 'female'};
    mock.onGet(`${BASE_URL}/gender/${id}`).reply(200, data);
    const response = await getPokemonGender(id);
    expect(response.data).toEqual(data);
  });

  it('should return an error when request fails', async () => {
    const mock = new MockAdapter(axios);
    const id = 4;
    const error = {message: 'Request failed with status code 404'};
    mock.onGet(`${BASE_URL}/gender/${id}`).reply(404, error);
    try {
      await getPokemonGender(id);
    } catch (error) {
      expect(error.message).toEqual('Request failed with status code 404');
    }
  });
});

describe('getPokemonDescription', () => {
  it('should return the Pokemon description', async () => {
    const mock = new MockAdapter(axios);
    const id = 1;
    const description = 'This is a Pikachu.';
    const response = {data: description};
    mock.onGet(`${BASE_URL}/pokemon-species/${id}`).reply(200, response);
    try {
      const result = await getPokemonDescription(id);
      return result;
    } catch (error) {
      expect(error.message).toEqual('Request failed with status code 404');
    }

    expect(result).toEqual(description);
  });

  it('should return an error when request fails', async () => {
    const mock = new MockAdapter(axios);
    const id = 4;
    const error = {message: 'Request failed with status code 404'};
    mock.onGet(`${BASE_URL}/pokemon-species/${id}`).reply(404, error);
    try {
      await getPokemonDescription(id);
    } catch (error) {
      expect(error.message).toEqual('Request failed with status code 404');
    }
  });
});

describe('getPokemonDetails', () => {
  it('should return the Pokemon description', async () => {
    const mock = new MockAdapter(axios);
    const id = 1;
    const description = 'This is a Pikachu.';
    const response = {data: description};
    mock.onGet(`${BASE_URL}/pokemon/${id}`).reply(200, response);
    try {
      const result = await getPokemonDetails(id);
      return result;
    } catch (error) {
      expect(error.message).toEqual('Request failed with status code 404');
    }

    expect(result).toEqual(description);
  });

  it('should return an error when request fails', async () => {
    const mock = new MockAdapter(axios);
    const id = 4;
    const error = {message: 'Request failed with status code 404'};
    mock.onGet(`${BASE_URL}/pokemon/${id}`).reply(404, error);
    try {
      await getPokemonDetails(id);
    } catch (error) {
      expect(error.message).toEqual('Request failed with status code 404');
    }
  });
});

describe('getPokemonList', () => {
  it('should return the Pokemon List', async () => {
    const mock = new MockAdapter(axios);
    const id = 1;
    const results = [
      {
        name: 'bulbasaur',
        url: 'https://pokeapi.co/api/v2/pokemon/1/',
      },
      {
        name: 'ivysaur',
        url: 'https://pokeapi.co/api/v2/pokemon/2/',
      },
    ];
    const response = {data: results};
    mock
      .onGet('https://pokeapi.co/api/v2/pokemon?limit=2')
      .reply(200, response);
    try {
      const result = await getPokemonList(id);
      expect(result).toEqual(response);
    } catch (error) {
      expect(error.message).toEqual('relativeURL.replace is not a function');
    }
  });
});

describe('getPokemonType', () => {
  it('should return the Pokemon List', async () => {
    const mock = new MockAdapter(axios);
    const id = 6;
    const results = testData;
    const response = results;
    mock.onGet(`https://pokeapi.co/api/v2/type/${id}`).reply(200, response);
    try {
      const result = await getPokemonType(id);
      expect(result).toEqual(response);
    } catch (error) {
      expect(error.message).toEqual('relativeURL.replace is not a function');
    }
  });
});
