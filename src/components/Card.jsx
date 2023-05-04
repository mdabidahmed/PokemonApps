import {useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../constants/color';
import {PokemonContext} from '../context/PokemonContext';

import {URL} from '../constants/url';

import {addLeadingZeros} from '../utils/leadingZeros';
const Card = ({pokemon, loading, infoPokemon}) => {
  const navigation = useNavigation();

  const {
    url,
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

  const renderItem = ({item}) => {
    const multiColors = item?.types?.map(({type}) => COLORS[type['name']]);
    const singleColor = ['#acb6e5', '#86fde8'];
    const imageUrl = item.sprites.other.dream_world.front_default;
    const handlePress = () => {
      fetchDescription(item.id);
      navigation.navigate('Pokemon Details', {item});
    };

    const ColorGenerate = () => {
      return multiColors.length >= 2 ? multiColors : singleColor;
    };
    return (
      <TouchableOpacity onPress={handlePress}>
        <View style={CardStyles.card}>
          <LinearGradient colors={ColorGenerate()} style={{borderRadius: 10}}>
            {imageUrl && (
              <Image
                source={{uri: `${URL}/${item.name}.png`}}
                style={{
                  width: 180,
                  height: 160,
                  resizeMode: 'cover',
                }}
              />
            )}
            <View style={CardStyles.cardContent}>
              <Text style={CardStyles.heading}>{item.name}</Text>
              <Text style={CardStyles.heading}>{addLeadingZeros(item.id)}</Text>
            </View>
          </LinearGradient>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={CardStyles.container}>
      <FlatList
        data={pokemon}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{flexGrow: 1}}
      />
    </View>
  );
};

const CardStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
  },
  card: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    borderStyle: 'dashed',
    marginVertical: 10,
    marginHorizontal: 10,
    shadowColor: '#171717',
    // shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    // paddingVertical: 2,
    textAlign: 'center',
    // alignItems: 'center',
    // justifyContent: 'center',
    // alignSelf: 'center',
    color: '#1A237E',
    textTransform: 'capitalize',
    fontFamily: 'roboto',
    letterSpacing: 1,
  },
  cardContent: {paddingBottom: 20},
});
export default Card;
