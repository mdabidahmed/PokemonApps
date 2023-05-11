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
import Loader from '../../components/atom/loader/Loader';
import Card from '../../components/molecules/card/Card';
import HeaderComponent from '../../components/molecules/header/Header';
import {PokemonContext} from '../../components/organism/context/PokemonContext';
import {
  APPLY_FILTER,
  APP_NAME,
  CHEVROLET_LEFT_ALT_TEXT,
  CHEVROLET_RIGHT_ALT_TEXT,
  FILTER,
  FILTER_ICON_ALT_TEXT,
  GO_BACK_LISTING_PAGE_ALT_TEXT,
  POKEMON_DESCRIPTION,
  RESET,
  SEARCH_PLACEHOLDER,
  TYPE,
} from '../../constants/string/strings';
import {TYPE_SELECTED} from '../../constants/type/type';
import {getPokemonList} from '../../services/api';
import {PokemonListStyles} from './PokemonList.Style';
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
    handleCheckbox,
    typeFilteredPokemons,
    typeSelected,
    setTypeSelected,
  } = useContext(PokemonContext);

  const submitFilter = () => {
    setFilteredPokemonList(typeFilteredPokemons);
    setShowModal(false);
  };
  const resetFilter = () => {
    setTypeSelected(TYPE_SELECTED);
    setFilteredPokemonList(pokeData);
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
    // Fetch Pokemon Card Details
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
      {/* Header Component */}
      <HeaderComponent title={APP_NAME} description={POKEMON_DESCRIPTION} />
      {/* Filter user input field */}
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
          {/* Filter button */}
          <TouchableOpacity
            style={PokemonListStyles.filter}
            onPress={handleFilterIconPress}>
            <Image
              source={require('../../assets/icons/filters.png')}
              style={PokemonListStyles.icon}
              alt={FILTER_ICON_ALT_TEXT}
            />
          </TouchableOpacity>
        </View>

        {/* FILTER functionality with Modal*/}

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
                {/* Back button icon */}
                <TouchableOpacity onPress={handleCloseModal}>
                  <Image
                    source={require('../../assets/icons/remove.png')}
                    style={PokemonListStyles.icon}
                    alt={GO_BACK_LISTING_PAGE_ALT_TEXT}
                  />
                </TouchableOpacity>
              </View>
              <Text style={PokemonListStyles.header}>{FILTER}</Text>
              <View style={PokemonListStyles.box}>
                <Text style={PokemonListStyles.type}>{TYPE}</Text>
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                  {Object.entries(typeSelected).map(([name, value]) => (
                    <View key={name} style={PokemonListStyles.checkboxSections}>
                      <CheckBox
                        key={name}
                        name={name}
                        onValueChange={newValue =>
                          handleCheckbox(name, newValue)
                        }
                        value={value}
                      />
                      <Text style={PokemonListStyles.checkboxValue}>
                        {name}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
              {/* Filter Button */}
              <View style={PokemonListStyles.filterButtonContainer}>
                <TouchableOpacity
                  onPress={submitFilter}
                  style={PokemonListStyles.button}>
                  <Text style={PokemonListStyles.buttonText}>
                    {APPLY_FILTER}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={PokemonListStyles.button}
                  onPress={resetFilter}>
                  <Text style={PokemonListStyles.buttonText}>{RESET}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
      {loading ? (
        <Loader />
      ) : (
        <View>
          {/* Filter Modal Section */}
          <View style={PokemonListStyles.cardContainer}>
            <Card pokemon={filteredPokemonList} />
          </View>
          {/* Goto Previous page */}
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
                  source={require('../../assets/icons/left-chevron.png')}
                  style={PokemonListStyles.icon}
                  alt={CHEVROLET_LEFT_ALT_TEXT}
                />
              </TouchableOpacity>
            </View>
            {/* Goto Next page */}
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
                    source={require('../../assets/icons/right-chevron.png')}
                    style={PokemonListStyles.icon}
                    alt={CHEVROLET_RIGHT_ALT_TEXT}
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
