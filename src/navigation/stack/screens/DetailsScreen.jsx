import React, {useContext, useState} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {PokemonContext} from '../../../../src/context/PokemonContext';
const DetailsScreenComponent = item => {
  console.log('params--->', item.route.params.item);
  const pokemon = item.route.params.item;
  const [description, setDescription] = useState([]);

  // console.log('state--->', pokemon);
  const {
    allPokemons,
    globalPokemons,
    getPokemonByID,
    onClickLoadMore,
    genderList,
    pokemonDetails,
    pokemonDescription,
    handlePokemonPress,
    fetchDescription,
  } = useContext(PokemonContext);

  // console.log(allPokemons, globalPokemons, getPokemonByID, onClickLoadMore);
  // console.log('allPokemons-->', allPokemons);
  // console.log('globalPokemons-->', globalPokemons);
  // console.log('getPokemonByID', getPokemonByID(1));
  // console.log('onClickLoadMore', onClickLoadMore);
  console.log('Description****************', pokemonDescription);
  console.log('genderList', genderList);
  console.log('pokemonDetails', pokemonDetails);

  // const res = getPokemonByID(pokemon.id);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.item}>
            <Text style={styles.heading}>{pokemon.name}</Text>
            <Text style={styles.heading}>#{pokemon.id}</Text>
          </View>
          <View style={styles.item}>
            <Image
              source={require('../../../assets/close.png')}
              style={{
                width: 40,
                height: 40,
                resizeMode: 'contain',
              }}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.item}>
            <Image
              source={require('../../../assets/bulbasaur.png')}
              style={{
                width: 180,
                height: 160,
                resizeMode: 'contain',
              }}
            />
          </View>

          <View style={styles.item}>
            <Text>Description</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.item, styles.gender]}>
            {genderList.map((item, index) => (
              <Text key={index}>
                {item.name}
                {index !== genderList.length - 1 && <Text>, </Text>}
              </Text>
            ))}
          </View>
          <View style={styles.item}>
            <Text>Row2</Text>
          </View>
        </View>
      </View>
      {/* <View>
        <View>
          <Textr>{item.route.params.item.name}</Textr>
          <Image
            source={require('../../../assets/bulbasaur.png')}
            style={{
              width: 180,
              height: 160,
              resizeMode: 'contain',
            }}
          />
          {/* <Image
            source={{
              uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonItem.id}.svg`,
            }}
          /> */}
      {/* <View>
            {pokemonItem.abilities.map(poke => {
              return (
                <View>
                  <Text>{poke.ability.name}</Text>
                </View>
              );
            })}
          </View> */}
      {/* <View>
            {pokemonItem.stats.map(poke => {
              return (
                <>
                  <Text>
                    {poke.stat.name}:{poke.base_stat}
                  </Text>
                </>
              );
            })}
          </View> *
        </View>
      </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'column',
  },
  row: {
    // flex: 1,
    flexDirection: 'row',
  },
  item: {
    // flex: 1,
    // backgroundColor: '#ccc',
    margin: 5,
  },
  gender: {
    flexDirection: 'row',
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    color: 'black',
    textTransform: 'capitalize',
    fontFamily: 'roboto',
  },
});

export default DetailsScreenComponent;

{
  /* <View>
      <Text>Pokemon Details:</Text>
      <Text>Name: {pokemon.name}</Text>
      <Text>Height: {pokemon.height}</Text>
      <Text>Weight: {pokemon.weight}</Text>

      {evolutionChain && (
        <View>
          <Text>Evolution Chain:</Text>
          <Text>{evolutionChain.species.name}</Text>

          {evolutionChain.evolves_to.length > 0 && (
            <View>
              <Text>Evolves To:</Text>
              {evolutionChain.evolves_to.map(evolve => (
                <Text key={evolve.species.name}>{evolve.species.name}</Text>
              ))}
            </View>
          )}
        </View>
      )}
    </View> */
}
