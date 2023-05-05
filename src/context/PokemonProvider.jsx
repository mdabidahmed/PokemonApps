import {useEffect, useState} from 'react';
// import {useForm} from '../hook/useForm';
import axios from 'axios';

import {URL_GENDER} from '../constants/url';
import {PokemonContext} from './PokemonContext';
const API_BASE_URL = process.env.API_BASE_URL;
const url = process.env.API_BASE_URL;
export const PokemonProvider = ({children}) => {
  const [genderList, setGenderList] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [pokemonDescription, setPokemonDescription] = useState(null);

  useEffect(() => {
    // Fetch Description
    fetchDescription();
    // Fetch Gender List
    fetchGender();
  }, []);

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

  const fetchDescription = id => {
    axios
      .get(`${API_BASE_URL}/pokemon-species/${id}`)
      .then(response => {
        setPokemonDescription(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <PokemonContext.Provider
      value={{
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
