import {useNavigation} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {PokemonContext} from '../../../../src/context/PokemonContext';
import {addLeadingZeros} from '../../../utils/LeadingZeros';
const DetailsScreenComponent = item => {
  // console.log('params--->', item.route.params.item);
  const pokemon = item.route.params.item;
  const [description, setDescription] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
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
  const onClose = () => {
    navigation.navigate('Pokemon list');
  };
  const handleReadMore = () => {
    setModalVisible(true);
  };
  // const res = getPokemonByID(pokemon.id);
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.row}>
            <View style={styles.item}>
              <Text style={styles.heading}>{pokemon.name}</Text>
              <Text style={styles.cardNumber}>
                {addLeadingZeros(pokemon.id)}
              </Text>
            </View>
            <View style={[styles.item, styles.close]}>
              <TouchableOpacity onPress={onClose}>
                <Image
                  source={require('../../../assets/close.png')}
                  style={{
                    width: 24,
                    height: 24,
                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.item}>
              <View style={styles.card}>
                <LinearGradient
                  colors={['#acb6e5', '#86fde8']}
                  style={{borderRadius: 10}}>
                  <View style={styles.image}>
                    <Image
                      source={require('../../../assets/Charizard.png')}
                      style={{
                        width: 160,
                        height: 200,
                        resizeMode: 'contain',
                      }}
                    />
                  </View>
                </LinearGradient>
              </View>
            </View>

            <View style={[styles.item, styles.description]}>
              <Text style={styles.descriptionText}>
                {pokemonDescription &&
                  pokemonDescription.flavor_text_entries.find(
                    entry => entry.language.name === 'en',
                  ).flavor_text}
              </Text>
              <TouchableOpacity onPress={handleReadMore}>
                <Text style={styles.readMore}>... Read More</Text>
              </TouchableOpacity>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}>
                <View style={styles.modalContainer}>
                  <Text style={styles.modalDescription}>
                    {pokemonDescription &&
                      pokemonDescription.flavor_text_entries
                        .filter(item => item.language.name === 'en')
                        .map((res, index) => (
                          <Text key={index}>{res.flavor_text}</Text>
                        ))}
                  </Text>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Text style={styles.closeButton}>
                      <Image
                        source={require('../../../assets/cancel.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                        }}
                      />
                    </Text>
                  </TouchableOpacity>
                </View>
              </Modal>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.item}>
              <Text style={styles.label}>Gender(s)</Text>
              <View style={styles.gender}>
                {genderList.map((item, index) => (
                  <Text key={index} style={styles.value}>
                    {item.name}
                    {index !== genderList.length - 1 && <Text>, </Text>}
                  </Text>
                ))}
              </View>
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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 16,
    paddingVertical: 24,
    // padding: 16,
  },
  readMore: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  row: {
    // flex: 1,
    flexDirection: 'row',
  },
  description: {
    // flexDirection: 'row',
    // justifyContent: 'center',
    // paddingTop: 100,
    width: 200,
    // color: 'black',
  },
  descriptionText: {
    color: 'black',
    fontSize: 16,
    // alignItems: 'center',
  },
  item: {
    // flex: 1,
    // backgroundColor: '#ccc',
    margin: 5,
  },
  close: {
    // flexDirection: 'row',
    // alignItems: 'end',
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'flex-end',
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
  },
  gender: {
    flexDirection: 'row',
  },
  value: {
    textTransform: 'capitalize',
    fontSize: 14,
    fontWeight: '400',
    color: 'black',
    paddingVertical: 5,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    // paddingVertical: 5,
    // alignItems: 'center',
    // justifyContent: 'center',
    // alignSelf: 'center',
    color: '#191654',
    textTransform: 'uppercase',
    fontFamily: 'roboto',
    letterSpacing: 1,
  },
  card: {
    borderWidth: 0.5,
    borderColor: '#191654',
    borderRadius: 10,
    borderStyle: 'dashed',
    // marginVertical: 10,
    marginHorizontal: 10,
    shadowColor: '#171717',
    // shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  image: {padding: 10},
  cardNumber: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
    fontFamily: 'roboto',
    letterSpacing: 1,
    color: '#191654',
  },
  modalContainer: {
    backgroundColor: '#0f0c29',
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 150,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalDescription: {
    fontSize: 16,
    lineHeight: 24,
    // marginVertical: 10,
    color: 'white',
  },
  closeButton: {
    // color: 'blue',
    // textDecorationLine: 'underline',
    position: 'absolute',
    bottom: 320,
    left: 140,
    // backgroundColor: 'white',
    width: 30,
    height: 32,
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
