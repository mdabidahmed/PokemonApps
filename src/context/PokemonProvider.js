import {useEffect, useState} from 'react';
// import {useForm} from '../hook/useForm';

import {URL_GENDER} from '../constants/url';
import {
  getPokemonDescription,
  getPokemonDetails,
  getPokemonType,
} from '../services/api';
import {filterUniqueById} from '../utils/filterUniqueById';
import {PokemonContext} from './PokemonContext';
const API_BASE_URL = process.env.API_BASE_URL;
const url = process.env.API_BASE_URL;
export const PokemonProvider = ({children}) => {
  const [genderList, setGenderList] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [pokemonDescription, setPokemonDescription] = useState(null);
  const [pokeData, setPokeData] = useState([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState(pokeData);
  const [weakAgainst, setWeakAgainst] = useState([]);

  // Call the getPokemonList function when the component mounts.
  useEffect(() => {
    // Fetch Description
    // fetchDescription();
    // Fetch Gender List
    fetchGender();
  }, []);

  /**
   * Retrieves the gender of a Pokemon from the PokeAPI.
   * @param {String} name - The ID of the Pokemon to retrieve the gender for.
   * @returns {Promise} A promise that resolves to an object representing the gender of the Pokemon.
   */

  const fetchGender = async pokemonName => {
    const responses = await Promise.all(URL_GENDER.map(url => fetch(url)));
    const data = await Promise.all(responses.map(response => response.json()));

    const genders = [];
    data.forEach(gender => {
      if (gender.name === 'female') {
        gender.pokemon_species_details.forEach(pokemon => {
          if (pokemon.pokemon_species.name === pokemonName) {
            return genders.push('female');
          }
        });
      }
      if (gender.name === 'male') {
        gender.pokemon_species_details.forEach(pokemon => {
          if (pokemon.pokemon_species.name === pokemonName) {
            return genders.push('male');
          }
        });
      }
      if (gender.name === 'genderless') {
        gender.pokemon_species_details.forEach(pokemon => {
          if (pokemon.pokemon_species.name === pokemonName) {
            return genders.push('genderless');
          }
        });
      }
    });

    setGenderList(genders);
  };
  // Retrieves Pokemon data from the API using the provided Pokemon ID
  const fetchDescription = async id => {
    try {
      const result = await getPokemonDescription(id);
      setPokemonDescription(result);
    } catch (error) {
      // If there is an error, log it to the console and re-throw the error.
      console.log(error);
    }
  };
  // Retrieves Pokemon list data from the API
  const getPokemon = async res => {
    res.map(async item => {
      try {
        const result = await getPokemonDetails(`${item.url.split('/')[6]}`);
        setPokeData(state => {
          state = [...state, result];
          const uniqueItems = filterUniqueById(state, 'id');
          return uniqueItems;
        });
        setFilteredPokemonList(state => {
          state = [...state, result];
          const uniqueItems = filterUniqueById(state, 'id');
          return uniqueItems;
        });
      } catch (error) {
        // If there is an error, log it to the console and re-throw the error.
        console.log(error.message);
      }
    });
  };
  // This function fetches the list of weaknesses for a given Pokemon and returns it as an array of strings.
  // It takes a Pokemon ID as a parameter and uses the PokeAPI to retrieve the data.
  const findPokemonWeakness = async id => {
    try {
      const result = await getPokemonType(id);
      setWeakAgainst(result.damage_relations.double_damage_from);
      return result;
    } catch (error) {
      // If there is an error, log it to the console and re-throw the error.
      console.log(error.message);
    }
  };

  return (
    <PokemonContext.Provider
      value={{
        findPokemonWeakness,
        weakAgainst,
        getPokemon,
        pokeData,
        setPokeData,
        setFilteredPokemonList,
        filteredPokemonList,
        genderList,
        pokemonDetails,
        pokemonDescription,
        fetchDescription,
        fetchGender,
      }}>
      {children}
    </PokemonContext.Provider>
  );
};
