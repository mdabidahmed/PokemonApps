import {useEffect, useState} from 'react';
// import {useForm} from '../hook/useForm';

import {TYPE_SELECTED} from '../../../constants/type/type';
import {URL_GENDER} from '../../../constants/url/url';
import {
  getPokemonDescription,
  getPokemonDetails,
  getPokemonType,
} from '../../../services/api';
import {filterUniqueById} from '../../../utils/fiterUniqueById/filterUniqueById';
import {PokemonContext} from './PokemonContext';
const API_BASE_URL = process.env.API_BASE_URL;
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
  const findPokemonWeakness = async (dispatch, id) => {
    try {
      const response = await getPokemonType(id);
      dispatch({
        type: 'FETCH_SUCCESS',
        payload: response.damage_relations.double_damage_from,
      });
    } catch (error) {
      dispatch({type: 'FETCH_ERROR', payload: error.message});
    }
  };

  // Global Pokemon List limit is 200 i.e. 200 pokemon card will be displayed
  // It takes a Pokemon ID as a parameter and uses the PokeAPI to retrieve the data.
  const fetchGlobalPokemons = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/pokemon?limit=200`);
      const data = await response.json();
      const promises = data.results.map(async pokemon => {
        const res = await fetch(pokemon.url);
        const data = await res.json();
        return data;
      });
      const results = await Promise.all(promises);
      setGlobalPokemons(results);
    } catch (error) {
      console.error(error);
    }
  };

  const [typeSelected, setTypeSelected] = useState(TYPE_SELECTED);

  const [typeFilteredPokemons, setTypeFilteredPokemons] = useState([]);
  const handleCheckbox = (name, checked) => {
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
        state = [...filteredResults];
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
