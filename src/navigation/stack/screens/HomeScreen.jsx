import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Card from '../../../components/Card';
const HomeScreenComponent = () => {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/');
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [pokeDex, setPokeDex] = useState();

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
    // console.log('pokemon main url-->', res);
    res.map(async item => {
      const result = await axios.get(item.url);
      setPokeData(state => {
        state = [...state, result.data];
        state.sort((a, b) => (a.id > b.id ? 1 : -1));
        // console.log('pokemon main details-->', state);
        return state;
      });
    });
  };
  useEffect(() => {
    pokeFun();
  }, [url]);

  return (
    <View style={HomeStyles.container}>
      <Card
        pokemon={pokeData}
        loading={loading}
        infoPokemon={poke => setPokeDex(poke)}
      />

      <View>
        <TouchableOpacity
          disabled={prevUrl === null ? true : false}
          onPress={() => {
            setPokeData([]);
            setUrl(prevUrl);
          }}
          style={{
            pointerEvents: prevUrl ? 'auto' : 'none',
            // backgroundColor: prevUrl ? 'yellow' : 'red',
            // padding: 10,
            marginVertical: 5,
            marginRight: 5,
            padding: 3,
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
              marginVertical: 5,
              position: 'absolute',
              // top: 30,
              padding: 3,
              left: '50%',
              // zIndex: 1,
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
    // backgroundColor: '#79b2f428',
  },
  button: {
    position: 'absolute',
    // bottom: 20,
    // right: 20,
    backgroundColor: '#2196F3',
    borderRadius: 10,
    paddingVertical: 10,
    // paddingHorizontal: 20,
  },
  title: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
export default HomeScreenComponent;
