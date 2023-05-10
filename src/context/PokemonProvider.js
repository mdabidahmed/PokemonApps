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
  const [globalPokemons, setGlobalPokemons] = useState([]);
  // Call the getPokemonList function when the component mounts.
  useEffect(() => {
    // Fetch Description
    // fetchDescription();
    // Fetch GlobalPokemon List
    fetchGlobalPokemons();
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

  // Global Pokemon List

  const fetchGlobalPokemons = async () => {
    // const baseURL = process.env.API_BASE_URL;
    // const res = await fetch(`${baseURL}pokemon?limit=100&offset=0`);
    // const data = await res.json();

    try {
      const response = await fetch(
        'https://pokeapi.co/api/v2/pokemon?limit=200',
      );
      const data = await response.json();
      // console.log('data-->', data);
      const promises = data.results.map(async pokemon => {
        // console.log('pokemon', pokemon);
        const res = await fetch(pokemon.url);
        const data = await res.json();
        // console.log('data-id-->', data.id);
        return data;
      });
      const results = await Promise.all(promises);
      // console.log('results-->', results);
      setGlobalPokemons(results);
      // return data;
    } catch (error) {
      console.error(error);
    }
  };

  const [typeSelected, setTypeSelected] = useState({
    grass: false,
    normal: false,
    fighting: false,
    flying: false,
    poison: false,
    ground: false,
    rock: false,
    bug: false,
    ghost: false,
    steel: false,
    fire: false,
    water: false,
    electric: false,
    psychic: false,
    ice: false,
    dragon: false,
    dark: false,
    fairy: false,
    unknow: false,
    shadow: false,
  });

  // setFilteredPokemonList(state => {
  //   state = [...state, result];
  //   const uniqueItems = filterUniqueById(state, 'id');
  //   return uniqueItems;
  // });

  const [typeFilteredPokemons, setTypeFilteredPokemons] = useState([]);
  // console.log('typeSelected', typeSelected);
  console.log('filteredPokemons', typeFilteredPokemons);
  const handleCheckbox = (name, checked) => {
    // console.log('name-->', name);
    // console.log('checked-->', checked);
    setTypeSelected({
      ...typeSelected,
      [name]: checked,
    });

    if (checked) {
      const filteredResults = globalPokemons.filter(pokemon =>
        pokemon.types.map(type => type.type.name).includes(name),
      );
      setTypeFilteredPokemons(state => {
        state = [...typeFilteredPokemons, ...filteredResults];
        const uniqueItems = filterUniqueById(state, 'id');
        return uniqueItems;
      });
    } else {
      const filteredResults = typeFilteredPokemons.filter(
        pokemon => !pokemon.types.map(type => type.type.name).includes(name),
      );
      setTypeFilteredPokemons(state => {
        state = [...pokeData];
        const uniqueItems = filterUniqueById(state, 'id');
        return uniqueItems;
      });
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
        handleCheckbox,
        typeFilteredPokemons,
        typeSelected,
        setTypeSelected,
      }}>
      {children}
    </PokemonContext.Provider>
  );
};
