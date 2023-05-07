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

  const {
    getPokemon,
    pokeData,
    setPokeData,
    setFilteredPokemonList,
    filteredPokemonList,
  } = useContext(PokemonContext);
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
    <View style={[PokemonListStyles.container]}>
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
        <Modal visible={showModal} animationType="slide">
          <View style={PokemonListStyles.modalContainer}>
            <Text>Filter options go here</Text>
            <TouchableOpacity onPress={handleCloseModal}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
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
