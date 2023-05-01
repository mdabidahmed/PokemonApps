import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Card from '../../../components/Card';
import HeaderComponent from '../../../components/Header';
const HomeScreenComponent = () => {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/');
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [pokeDex, setPokeDex] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = text => {
    setSearchQuery(text);
    // perform search logic here
  };

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
    });
  };
  useEffect(() => {
    pokeFun();
  }, [url]);

  return (
    <View style={HomeStyles.container}>
      <View>
        <HeaderComponent
          title="Pokedex"
          description="Search for any Pokemon that exists on the planet"
        />
      </View>

      {/* <View style={HomeStyles.filterContainer}>
        <View style={HomeStyles.inputContainer}>
          <TextInput
            style={HomeStyles.input}
            placeholder="Search"
            value={searchQuery}
            onChangeText={handleInputChange}
          />

          <TouchableOpacity onPress={handleFilterIconPress}>
            <Image
              source={require('../../../assets/filter.png')}
              style={{
                width: 24,
                height: 24,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
        </View>
        <Modal visible={showModal} animationType="slide">
          <View style={HomeStyles.modalContainer}>
            <Text>Filter options go here</Text>
            <TouchableOpacity onPress={handleCloseModal}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View> */}

      <View style={{height: 560}}>
        <Card
          pokemon={pokeData}
          loading={loading}
          infoPokemon={poke => setPokeDex(poke)}
        />
      </View>

      <View>
        <TouchableOpacity
          disabled={prevUrl === null ? true : false}
          onPress={() => {
            setPokeData([]);
            setUrl(prevUrl);
          }}
          style={{
            pointerEvents: prevUrl ? 'auto' : 'none',
            paddingTop: 1,
            marginRight: 5,
            top: 1,
            bottom: 0,
            position: 'absolute',
            right: '50%',
          }}>
          <Image
            source={require('../../../assets/previous.png')}
            style={{
              width: 24,
              height: 24,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>

        {nextUrl && (
          <TouchableOpacity
            onPress={() => {
              setPokeData([]);
              setUrl(nextUrl);
            }}
            style={{
              paddingTop: 1,
              position: 'absolute',
              top: 1,
              right: '40%',
              bottom: 0,
            }}>
            <Image
              source={require('../../../assets/next.png')}
              style={{
                width: 24,
                height: 24,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const HomeStyles = StyleSheet.create({
  container: {
    paddingBottom: 30,
    marginBottom: 5,
  },
  button: {
    position: 'absolute',
    backgroundColor: '#2196F3',
    borderRadius: 10,
    paddingVertical: 10,
  },
  title: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  filterContainer: {
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    borderRadius: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 18,
    backgroundColor: '#f0f0f0',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default HomeScreenComponent;
