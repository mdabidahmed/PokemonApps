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
import {PokemonContext} from '../context/PokemonContext';
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
    const imageUrl = item.sprites.other.dream_world.front_default;
    const handlePress = () => {
      console.log('item-->', item);
      // handlePokemonPress(item);
      fetchDescription(item.id);
      navigation.navigate('DetailsPage', {item});
    };

    return (
      <TouchableOpacity onPress={handlePress}>
        <View style={CardStyles.card}>
          <LinearGradient
            colors={['#acb6e5', '#86fde8']}
            style={{borderRadius: 10}}>
            {imageUrl && (
              <Image
                source={require('../assets/bulbasaur.png')}
                style={{
                  width: 180,
                  height: 160,
                  resizeMode: 'contain',
                }}
              />
            )}
            <Text style={CardStyles.heading}>{item.name}</Text>
            <Text style={CardStyles.heading}>#{item.id}</Text>
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
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 10,
    borderStyle: 'dashed',
    marginVertical: 10,
    marginHorizontal: 10,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
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
export default Card;
