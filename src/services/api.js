import axios from 'axios';
const BASE_URL = process.env.API_BASE_URL;
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getPokemonList = async url => {
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getPokemonDetails = async id => {
  try {
    const response = await api.get(`/pokemon/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// GET Pokemon Strengths & Weaknesses
export const getPokemonType = async id => {
  try {
    const response = await api.get(`${BASE_URL}/type/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// GET Pokemon Strengths & Weaknesses
export const getPokemonDescription = async id => {
  try {
    const response = await api.get(`${BASE_URL}/pokemon-species/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// GET Pokemon gender
export const getPokemonGender = id => {
  return axios.get(`${BASE_URL}/gender/${id}`);
};

// export const fetchPokemonListWithImage = async () => {
//   try {
//     const response = await axios.get(`${BASE_URL}/pokemon?limit=20`);
//     const pokemonList = response.data.results;
//     return pokemonList.map((pokemon, index) => ({
//       id: index + 1,
//       name: pokemon.name,
//       imageUrl: `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${addLeadingZeros(
//         index + 1,
//       )}.png`,
//     }));
//   } catch (error) {
//     console.error(error);
//   }
// };
