import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
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
import ProgressBar from 'react-native-progress/Bar';
import BadgeButton from '../components/BadgeButton';
import {URL} from '../constants/url';
import {PokemonContext} from '../context/PokemonContext';
import {getPokemonType} from '../services/api';
import {addLeadingZeros} from '../utils/leadingZeros';
import {meters_to_feet_and_inches} from '../utils/lengthUtils';
import {covert_Weight_to_Kg} from '../utils/weightUtils';
const PokemonDetailComponent = item => {
  // console.log('params--->', item.route.params.item.id);
  const pokemon = item.route.params.item;

  // const [des, setDes] = useState(pokemonDescription);
  const [modalVisible, setModalVisible] = useState(false);
  const [weakAgainst, setWeakAgainst] = useState([]);
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
    fetchGender,
  } = useContext(PokemonContext);

  useEffect(() => {
    findPokemonWeakness();
  }, [weakAgainst]);

  const findPokemonWeakness = () => {
    const id = pokemon.id;
    getPokemonType(id).then(response => {
      setWeakAgainst(response.data.damage_relations.double_damage_from);
    });
  };

  // console.log('p--weakAgainst--', weakAgainst);
  // console.log(allPokemons, globalPokemons, getPokemonByID, onClickLoadMore);
  // console.log('allPokemons-->', allPokemons);
  // console.log('globalPokemons-->', globalPokemons);
  // console.log('getPokemonByID', getPokemonByID(1));
  // console.log('onClickLoadMore', onClickLoadMore);
  // console.log('Description****************', pokemonDescription);
  // console.log('function', fetchGender('bulbasaur'));
  // console.log('type-->', pokemon.types);
  const onClose = () => {
    navigation.navigate('Pokemon list');
  };
  const handleReadMore = () => {
    setModalVisible(true);
  };
  // console.log('url--->', process.env.API_URL);
  // const res = getPokemonByID(pokemon.id);
  fetchGender(pokemon.name);
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
                  source={require('../assets/remove.png')}
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
                      source={{uri: `${URL}/${pokemon.name}.png`}}
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
                        source={require('../assets/cancel.png')}
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
            <View style={[styles.item, styles.col]}>
              <Text style={styles.label}>Gender(s)</Text>
              <View style={styles.fdrow}>
                {genderList &&
                  genderList.map((item, index) => (
                    <Text style={styles.value} key={index}>
                      {item}
                      {index !== genderList.length - 1 && <Text>, </Text>}
                    </Text>
                  ))}
              </View>
            </View>
            <View style={[styles.item, styles.col]}>
              <Text style={styles.label}>Weight</Text>
              <View>
                <Text style={[styles.value]}>
                  {covert_Weight_to_Kg(pokemon.weight)}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.row}>
            <View style={[styles.item, styles.col]}>
              <Text style={styles.label}>Height</Text>
              <View style={styles.fdrow}>
                <Text style={[styles.value]}>
                  {meters_to_feet_and_inches(pokemon.height)}
                </Text>
              </View>
            </View>
            <View style={[styles.item, styles.col]}>
              <Text style={styles.label}>Types</Text>
              <View style={styles.fdrow}>
                {pokemon.types.map(item => (
                  <View
                    key={item.slot}
                    style={{paddingRight: 10, paddingTop: 5}}>
                    <BadgeButton badgeText={item.type.name} />
                  </View>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.item, styles.col]}>
              <Text style={styles.label}>Abilities</Text>
              <View style={styles.fdrow}>
                {pokemon &&
                  pokemon.abilities.map((item, index) => (
                    <View key={item.slot}>
                      <Text style={styles.value}>
                        {item.ability.name}
                        {index !== pokemon.length - 1 && <Text>, </Text>}
                      </Text>
                    </View>
                  ))}
              </View>
            </View>
            <View style={[styles.item, styles.col]}>
              <Text style={styles.label}>Egg Groups</Text>
              <View style={styles.fdrow}>
                {pokemonDescription &&
                  pokemonDescription.egg_groups.map((item, index) => (
                    <View key={index} style={{paddingRight: 10, paddingTop: 5}}>
                      <BadgeButton badgeText={item.name} />
                    </View>
                  ))}
              </View>
            </View>
          </View>
          <View style={styles.row}>
            <View style={[styles.item, styles.col]}>
              <Text style={styles.label}>Weak Against</Text>
              <View style={styles.fdrow}>
                {weakAgainst &&
                  weakAgainst.map((item, index) => (
                    <View key={index} style={{paddingRight: 10, paddingTop: 5}}>
                      <BadgeButton badgeText={item.name} />
                    </View>
                  ))}
              </View>
            </View>
          </View>
        </View>

        <View style={styles.progressBarSection}>
          <Text style={styles.statsTitle}>Stats</Text>
          {pokemon.stats.map((stat, index) => (
            <View style={styles.containerStats} key={index}>
              <Text style={styles.labelStats}>{stat.stat.name}</Text>
              <View>
                <ProgressBar
                  color="#11114e"
                  thickness={2}
                  progress={stat.base_stat / 100}
                  width={240}
                  height={10}
                  borderRadius={0}
                  unfilledColor="#CBD5ED"
                />
                <Text style={styles.percentage}>{stat.base_stat}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: '#FAFCEA',
  },
  readMore: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  row: {
    flexDirection: 'row',
  },
  col: {width: '50%'},
  description: {
    width: 200,
  },
  descriptionText: {
    color: 'black',
    fontSize: 16,
  },
  item: {
    margin: 5,
  },
  close: {
    flex: 1,
    alignItems: 'flex-end',
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A237E',
  },
  fdrow: {
    flexDirection: 'row',
  },
  value: {
    textTransform: 'capitalize',
    fontSize: 16,
    fontWeight: '400',
    color: '#1A237E',
    paddingVertical: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
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
    marginHorizontal: 10,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
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
    color: 'white',
  },
  closeButton: {
    position: 'absolute',
    bottom: 320,
    left: 140,
    width: 30,
    height: 32,
  },
  sectionRight: {
    paddingLeft: 100,
  },
  containerStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  labelStats: {
    paddingLeft: 20,
    color: '#11114e',
    width: '35%',
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  progressBarSection: {
    backgroundColor: '#cfead9',
    paddingTop: 20,
  },
  statsTitle: {
    fontSize: 20,
    color: '#191654',
    textAlign: 'left',
    paddingLeft: 20,
    marginBottom: 18,
    fontWeight: '700',
  },
  percentage: {
    position: 'absolute',
    top: 0,
    left: 10,
    right: 0,
    bottom: 0,
    textAlign: 'left',
    color: '#fff',
    fontSize: 8,
  },
});

export default PokemonDetailComponent;

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
