import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
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
    <ScrollView>
      <View>
        <Card
          pokemon={pokeData}
          loading={loading}
          infoPokemon={poke => setPokeDex(poke)}
        />
      </View>
      <View style={{marginBottom: 10}}>
        {prevUrl && (
          <TouchableOpacity
            onPress={() => {
              setPokeData([]);
              setUrl(prevUrl);
            }}
            style={{backgroundColor: 'blue', padding: 10}}>
            <Text style={{color: 'white', fontSize: 18}}>Previous</Text>
          </TouchableOpacity>
        )}
        {nextUrl && (
          <TouchableOpacity
            onPress={() => {
              setPokeData([]);
              setUrl(nextUrl);
            }}
            style={{
              backgroundColor: 'blue',
              padding: 100,
              position: 'absolute',
              top: 30,
              left: 30,
              zIndex: 1,
            }}>
            <Text style={{color: 'black', fontSize: 18}}>Next</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};
export default HomeScreenComponent;
