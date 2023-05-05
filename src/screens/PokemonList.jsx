import axios from 'axios';
import React, {startTransition, useEffect, useState} from 'react';
import {
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Card from '../components/Card';
import HeaderComponent from '../components/header/Header';
import {PokemonListStyles} from '../styles/componentStyles/PokemonList.Style';
const PokemonListComponent = () => {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/');
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [pokeDex, setPokeDex] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [filteredPokemonList, setFilteredPokemonList] = useState(pokeData);

  const handleFilterIconPress = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const pokeFun = async () => {
    setLoading(true);
    const res = await axios.get(url);
    console.log('next', res.data.next);
    setNextUrl(res.data.next);
    setPrevUrl(res.data.previous);
    getPokemon(res.data.results);
    setLoading(false);
  };
  const getPokemon = async res => {
    res.map(async item => {
      const result = await axios.get(item.url);
      setPokeData(state => {
        state = [...state, result.data];
        state.sort((a, b) => (a.id > b.id ? 1 : -1));
        return state;
      });
      setFilteredPokemonList(state => {
        state = [...state, result.data];
        state.sort((a, b) => (a.id > b.id ? 1 : -1));
        return state;
      });
    });
  };
  useEffect(() => {
    pokeFun();
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

  return (
    <View style={PokemonListStyles.container}>
      <HeaderComponent
        title="Pokedex"
        description="Search for any Pokemon that exists on the planet"
      />

      <View style={PokemonListStyles.filterContainer}>
        <View style={PokemonListStyles.inputContainer}>
          <TextInput
            style={PokemonListStyles.input}
            placeholder="Search pokemon here"
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
              source={require('../assets/filters.png')}
              style={PokemonListStyles.icon}
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

      <View style={PokemonListStyles.cardContainer}>
        <Card
          pokemon={filteredPokemonList}
          loading={loading}
          infoPokemon={poke => setPokeDex(poke)}
        />
      </View>

      <View style={PokemonListStyles.paginationSection}>
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
              source={require('../assets/previous.png')}
              style={PokemonListStyles.icon}
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
                source={require('../assets/next.png')}
                style={PokemonListStyles.icon}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default PokemonListComponent;
