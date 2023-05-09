import CheckBox from '@react-native-community/checkbox';
import React, {startTransition, useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Loader from '../components/atom/loader/Loader';
import Card from '../components/molecules/card/Card';
import HeaderComponent from '../components/molecules/header/Header';
import {POKEMON_DESCRIPTION, SEARCH_PLACEHOLDER} from '../constants/string';
import {PokemonContext} from '../context/PokemonContext';
import {getPokemonList} from '../services/api';

import {PokemonListStyles} from '../styles/componentStyles/PokemonList.Style';
const PokemonListComponent = () => {
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState(`${process.env.API_BASE_URL}/pokemon`);
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  // const [modalVisible, setModalVisible] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [typeFilters, setTypeFilters] = useState({
    normal: false,
    fire: false,
    water: false,
    grass: false,
    electric: false,
    ice: false,
    fighting: false,
    poison: false,
    ground: false,
    flying: false,
    psychic: false,
    bug: false,
    rock: false,
    ghost: false,
    dragon: false,
    dark: false,
    steel: false,
    fairy: false,
  });
  const {
    getPokemon,
    pokeData,
    setPokeData,
    setFilteredPokemonList,
    filteredPokemonList,
  } = useContext(PokemonContext);

  const handleTypeFilterChange = type => {
    setTypeFilters(prevFilters => ({
      ...prevFilters,
      [type]: !prevFilters[type],
    }));
  };

  function newfilteredPokemonList() {
    if (pokeData) {
      pokeData.filter(pokemon => {
        console.log('inside', pokemon);
        const typeFilters = [normal, fire, water];
        const res = pokemon.types.some(type => typeFilters.includes(type));

        console.log('res--**', res);
        return res;
        // const typeFilters = Object.keys(typeFilters).filter(
        //   type => typeFilters[type],
        // );

        // if (typeFilters.length === 0) {
        //   return true;
        // }

        // return pokemon.types.some(type => typeFilters.includes(type));
      });
    }
  }

  const submitFilter = () => {
    newfilteredPokemonList();
  };
  console.log('type-filter-->', typeFilters);
  console.log('PokemonData-->', pokeData);
  console.log('newfilteredPokemonList', newfilteredPokemonList);

  const toggleTypeSelection = type => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };
  const filterByType = pokemon => {
    if (selectedTypes.length === 0) {
      return true;
    } else {
      return pokemon.types.some(type => selectedTypes.includes(type));
    }
  };

  const handleFilterIconPress = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  /**
   * Retrieves details of a Pokemon card from the PokeAPI.
   * @param {string} id - The ID of the Pokemon card to retrieve the details for.
   * @returns {Promise} A promise that resolves to an object representing the details of the Pokemon card.
   */
  const fetchPokemonCardDetails = async () => {
    setLoading(true);
    try {
      const response = await getPokemonList(url);
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      getPokemon(response.results);
      setLoading(false);
    } catch (error) {
      // If there is an error, log it to the console and re-throw the error.
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchPokemonCardDetails();
  }, [url]);

  const filterPokemonResults = searchText => {
    const filteredPokemon = pokeData?.filter(pokemon => {
      return (
        pokemon.name.toLowerCase().startsWith(searchText.toLowerCase()) ||
        pokemon.id.toString().includes(searchText)
      );
    });

    return filteredPokemon;
  };
  const {width} = Dimensions.get('window');
  return (
    <View style={[PokemonListStyles.container]} testID="ptid">
      <View style={PokemonListStyles.headerContainer}>
        <HeaderComponent title="Pokedex" description={POKEMON_DESCRIPTION} />
      </View>
      <View style={PokemonListStyles.filterContainer}>
        <View style={PokemonListStyles.inputContainer}>
          <TextInput
            style={PokemonListStyles.input}
            placeholder={SEARCH_PLACEHOLDER}
            value={searchQuery}
            onChangeText={text => {
              setSearchQuery(text);
              startTransition(() => {
                const updatedPokemon = filterPokemonResults(text);
                setFilteredPokemonList(updatedPokemon);
              });
            }}
          />

          <TouchableOpacity
            style={PokemonListStyles.filter}
            onPress={handleFilterIconPress}>
            <Image
              source={require('../assets/icons/filters.png')}
              style={PokemonListStyles.icon}
              accessibilityLabel="Filter icon for getting result from filter"
            />
          </TouchableOpacity>
        </View>

        {/* FILTER starts from here */}

        <View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={showModal}
            onRequestClose={handleCloseModal}>
            <View>
              <View
                style={[
                  PokemonListStyles.item,
                  PokemonListStyles.close,
                  PokemonListStyles.closeContainer,
                ]}>
                <TouchableOpacity onPress={handleCloseModal}>
                  <Image
                    source={require('../assets/icons/remove.png')}
                    style={PokemonListStyles.icon}
                    accessibilityLabel="Go back to Pokemon Listing Page"
                  />
                </TouchableOpacity>
              </View>
              <Text style={PokemonListStyles.header}>Filter</Text>
              <View style={PokemonListStyles.box}>
                <Text style={PokemonListStyles.type}>Type</Text>
                {/* First row */}
                {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{marginLeft: 20}}>Show only favorites</Text>
                  <CheckBox
                    value={showOnlyFavorites}
                    onValueChange={setShowOnlyFavorites}
                  />
                </View> */}

                {/* Second row */}
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                  {Object.keys(typeFilters).map(type => (
                    <View
                      key={type}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '50%',
                      }}>
                      <CheckBox
                        value={typeFilters[type]}
                        onValueChange={() => handleTypeFilterChange(type)}
                      />
                      <Text style={{marginLeft: 5}}>{type}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={PokemonListStyles.filterButtonContainer}>
                <TouchableOpacity
                  onPress={submitFilter}
                  style={PokemonListStyles.button}>
                  <Text style={PokemonListStyles.buttonText}>Apply Filter</Text>
                </TouchableOpacity>
                <TouchableOpacity style={PokemonListStyles.button}>
                  <Text style={PokemonListStyles.buttonText}>Reset</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          {/* <TouchableHighlight
            onPress={() => {
              setModalVisible(true);
            }}>
            <Text>Filter by type</Text>
          </TouchableHighlight> */}
          {/* <FlatList
        data={pokemonData.filter(filterByType)}
        renderItem={renderPokemon}
        keyExtractor={pokemon => pokemon.id.toString()}
      /> */}
        </View>

        {/* FILTER ends from here */}
      </View>
      {loading ? (
        <Loader />
      ) : (
        <View>
          <View style={PokemonListStyles.cardContainer}>
            <Card pokemon={filteredPokemonList} />
          </View>

          <View
            style={[PokemonListStyles.paginationSection, {width: width * 1}]}>
            <View style={PokemonListStyles.prevBtn}>
              <TouchableOpacity
                disabled={prevUrl === null ? true : false}
                onPress={() => {
                  setPokeData([]);
                  setFilteredPokemonList([]);
                  setUrl(prevUrl);
                }}
                style={{
                  pointerEvents: prevUrl ? 'auto' : 'none',
                  paddingTop: 1,
                }}>
                <Image
                  source={require('../assets/icons/left-chevron.png')}
                  style={PokemonListStyles.icon}
                  accessibilityLabel="Click button for List of previous 20 Pokemon Card"
                />
              </TouchableOpacity>
            </View>
            <View style={PokemonListStyles}>
              {nextUrl && (
                <TouchableOpacity
                  onPress={() => {
                    setPokeData([]);
                    setFilteredPokemonList([]);
                    setUrl(nextUrl);
                  }}
                  style={{
                    paddingTop: 1,
                  }}>
                  <Image
                    source={require('../assets/icons/right-chevron.png')}
                    style={PokemonListStyles.icon}
                    accessibilityLabel="Click button for List of next 20 Pokemon Card"
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default PokemonListComponent;
