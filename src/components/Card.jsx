import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const Card = ({pokemon, loading, infoPokemon}) => {
  const renderItem = ({item}) => {
    const imageUrl = item.sprites.other.dream_world.front_default;
    return (
      <TouchableOpacity onClick={() => infoPokemon(item)}>
        <View style={CardStyles.card}>
          <LinearGradient
            colors={['#acb6e5', '#86fde8']}
            style={{borderRadius: 10}}>
            {imageUrl != undefined ? (
              <Image
                source={require('../assets/bulbasaur.png')}
                style={{
                  width: 180,
                  height: 160,
                  resizeMode: 'contain',
                }}
              />
            ) : (
              <Image
                source={require('../assets/placeholder.png')}
                style={{
                  width: 150,
                  height: 150,
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
      />
    </View>
  );
};

const CardStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#79b2f428',
  },
  card: {
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 10,
    borderStyle: 'dashed',
    // paddingVertical: 10,
    // paddingHorizontal: 20,
    marginVertical: 10,
    marginHorizontal: 10,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    color: '#8E2DE2',
    textTransform: 'capitalize',
    fontFamily: 'roboto',
  },
});
export default Card;
