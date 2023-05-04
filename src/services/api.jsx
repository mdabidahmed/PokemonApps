import axios from 'axios';

const API_BASE_URL = process.env.API_BASE_URL;

// GET Pokemon List
export const getPokemonList = () => {
  return axios.get(`${API_BASE_URL}/pokemon`);
};

// GET Pokemon Details
export const getPokemonDetails = id => {
  return axios.get(`${API_BASE_URL}/pokemon/${id}`);
};

// GET Pokemon Description
export const getPokemonDescription = id => {
  return axios.get(`${API_BASE_URL}/pokemon-species/${id}`);
};

// GET Pokemon Strengths & Weaknesses

export const getPokemonType = id => {
  return axios.get(`${API_BASE_URL}/type/${id}`);
};

// GET Pokemon gender
export const getPokemonGender = id => {
  return axios.get(`${API_BASE_URL}/gender/${id}`);
};
