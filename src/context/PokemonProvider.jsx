import {useEffect, useState} from 'react';
// import {useForm} from '../hook/useForm';
import axios from 'axios';

import {URL_GENDER} from '../constants/url';
import {PokemonContext} from './PokemonContext';
export const API_BASE_URL = 'https://pokeapi.co/api/v2';
export const PokemonProvider = ({children}) => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [globalPokemons, setGlobalPokemons] = useState([]);
  const [offset, setOffset] = useState(0);

  // ----------------------------------
  const [pokemonList, setPokemonList] = useState([]);
  const [genderList, setGenderList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [pokemonDescription, setPokemonDescription] = useState(null);
  const [pokemonStrengths, setPokemonStrengths] = useState([]);
  const [pokemonWeaknesses, setPokemonWeaknesses] = useState([]);
  const [pokemonEvolutionChain, setPokemonEvolutionChain] = useState([]);
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/');
  useEffect(() => {
    // Fetch Description
    fetchDescription();
    // Fetch Gender List
    fetchGender();
  }, []);

  const fetchGender = async pokemonName => {
    // const urls = [
    //   'https://pokeapi.co/api/v2/gender/2/',
    //   'https://pokeapi.co/api/v2/gender/1/',
    //   'https://pokeapi.co/api/v2/gender/3/',
    // ];

    const responses = await Promise.all(URL_GENDER.map(url => fetch(url)));
    const data = await Promise.all(responses.map(response => response.json()));
    // console.log("gender-->", data);

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
        console.log('Pokemon Description:', response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const handlePokemonPress = pokemon => {
    // setSelectedPokemon(pokemon);
    // https://pokeapi.co/api/v2/pokemon-species/6
    // Fetch Pokemon Details
    // axios
    //   .get(pokemon.url)
    //   .then(response => {
    //     setPokemonDetails(response.data);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

    // Fetch Pokemon Description
    axios
      .get(`${API_BASE_URL}/pokemon-species/${pokemon.id}`)
      .then(response => {
        setPokemonDescription(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    // Fetch Pokemon Evolution Chain
    axios
      .get(pokemon.species.url)
      .then(speciesResponse => {
        axios
          .get(speciesResponse.data.evolution_chain.url)
          .then(evolutionChainResponse => {
            setEvolutionChain(evolutionChainResponse.data.chain);
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });

    // Fetch Pokemon Strengths and Weaknesses
    if (response.data.types && response.data.types.length > 0) {
      const types = response.data.types.map(type => type.type.name);
      const requests = types.map(type =>
        axios.get(`${API_BASE_URL}/type/${type}`),
      );
      Promise.all(requests)
        .then(responses => {
          const strengths = [];
          const weaknesses = [];
          responses.forEach(response => {
            const {damage_relations} = response.data;
            Object.keys(damage_relations).forEach(key => {
              const value = damage_relations[key];
              if (key === 'double_damage_to') {
                value.forEach(type => {
                  if (!strengths.includes(type.name)) {
                    strengths.push(type.name);
                  }
                });
              } else if (key === 'double_damage_from') {
                value.forEach(type => {
                  if (!weaknesses.includes(type.name)) {
                    weaknesses.push(type.name);
                  }
                });
              } else if (key === 'half_damage_to') {
                value.forEach(type => {
                  if (!weaknesses.includes(type.name)) {
                    weaknesses.push(type.name);
                  }
                });
              } else if (key === 'half_damage_from') {
                value.forEach(type => {
                  if (!strengths.includes(type.name)) {
                    strengths.push(type.name);
                  }
                });
              }
            });
          });
          setPokemonStrengths(strengths);
          setPokemonWeaknesses(weaknesses);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };
  // ----------------------------------

  // Utilizar CustomHook - useForm
  // const {valueSearch, onInputChange, onResetForm} = useForm({
  //   valueSearch: '',
  // });

  // Estados para la aplicación simples
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(false);

  // lLamar 50 pokemones a la API
  const getAllPokemons = async (limit = 20) => {
    const baseURL = 'https://pokeapi.co/api/v2/';

    const res = await fetch(
      `${baseURL}pokemon?limit=${limit}&offset=${offset}`,
    );
    const data = await res.json();

    const promises = data.results.map(async pokemon => {
      const res = await fetch(pokemon.url);
      const data = await res.json();
      return data;
    });
    const results = await Promise.all(promises);

    setAllPokemons([...allPokemons, ...results]);
    setLoading(false);
  };

  // List all pokemon
  // const getGlobalPokemons = async () => {
  //   const baseURL = 'https://pokeapi.co/api/v2/';

  //   const res = await fetch(`${baseURL}pokemon?limit=100000&offset=0`);
  //   const data = await res.json();

  //   const promises = data.results.map(async pokemon => {
  //     const res = await fetch(pokemon.url);
  //     const data = await res.json();
  //     return data;
  //   });
  //   const results = await Promise.all(promises);

  //   setGlobalPokemons(results);
  //   setLoading(false);
  // };

  // get pokemon details
  // const getPokemonByID = async id => {
  //   const baseURL = 'https://pokeapi.co/api/v2/';
  //   const res = await fetch(`${baseURL}pokemon-species/${id}`);
  //   const data = await res.json();
  //   return data;
  // };

  useEffect(() => {
    getAllPokemons();
  }, [offset]);

  // useEffect(() => {
  //   getGlobalPokemons();
  // }, []);

  // for load more
  const onClickLoadMore = () => {
    setOffset(offset + 50);
  };

  // Filter Function + State
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

  const [filteredPokemons, setfilteredPokemons] = useState([]);

  const handleCheckbox = e => {
    setTypeSelected({
      ...typeSelected,
      [e.target.name]: e.target.checked,
    });

    if (e.target.checked) {
      const filteredResults = globalPokemons.filter(pokemon =>
        pokemon.types.map(type => type.type.name).includes(e.target.name),
      );
      setfilteredPokemons([...filteredPokemons, ...filteredResults]);
    } else {
      const filteredResults = filteredPokemons.filter(
        pokemon =>
          !pokemon.types.map(type => type.type.name).includes(e.target.name),
      );
      setfilteredPokemons([...filteredResults]);
    }
  };

  return (
    <PokemonContext.Provider
      value={{
        genderList,
        pokemonDetails,
        pokemonDescription,
        handlePokemonPress,
        fetchDescription,
        fetchGender,
        url,
        // valueSearch,
        // onInputChange,
        // onResetForm,
        allPokemons,
        // globalPokemons,
        // getPokemonByID,
        // onClickLoadMore,
        // Loader
        loading,
        setLoading,
        // Btn Filter
        active,
        setActive,
        // Filter Container Checkbox
        // handleCheckbox,
        filteredPokemons,
      }}>
      {children}
    </PokemonContext.Provider>
  );
};
