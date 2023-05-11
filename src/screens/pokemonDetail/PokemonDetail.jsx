import {useNavigation} from '@react-navigation/native';
import {
  default as React,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ProgressBar from 'react-native-progress/Bar';
import BadgeButton from '../../components/atom/badge/BadgeButton';
import {PokemonContext} from '../../components/organism/context/PokemonContext';
import {
  GENDER,
  HEIGHT,
  POKEMON_ABILITIES,
  READ_MORE,
  TYPES,
  WEAK_AGAINST,
  WEIGHT,
} from '../../constants/string/strings';
import {COLOR_TOKEN} from '../../tokens/colors';
import {concatenateProperty} from '../../utils/concatenate/concatenateProperty';
import {addLeadingZeros} from '../../utils/leadingZeros/leadingZeros';
import {meters_to_feet_and_inches} from '../../utils/lengthUtils/lengthUtils';
import {covert_Weight_to_Kg} from '../../utils/weightUtils/weightUtils';
import PokemonDetailsStyles from './PokemonDetail.Style';
const PokemonDetailComponent = item => {
  const pokemon = item.route.params.item;
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();
  const {
    genderList,
    weakAgainst,
    findPokemonWeakness,
    pokemonDescription,
    fetchGender,
  } = useContext(PokemonContext);

  useEffect(() => {
    findPokemonWeakness(dispatch, pokemon.id);
  }, [pokemon.id]);

  const initialState = {
    loading: true,
    error: null,
    pokemonType: null,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_SUCCESS':
        return {
          ...state,
          loading: false,
          error: null,
          pokemonType: action.payload,
        };
      case 'FETCH_ERROR':
        return {
          ...state,
          loading: false,
          error: action.payload,
          pokemonType: null,
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const onClose = () => {
    navigation.navigate('Pokemon list');
  };
  const handleReadMore = () => {
    setModalVisible(true);
  };
  const transformedId = addLeadingZeros(pokemon.id);
  fetchGender(pokemon.name);
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={PokemonDetailsStyles.container}>
          <View style={PokemonDetailsStyles.row}>
            <View style={PokemonDetailsStyles.item}>
              <Text style={PokemonDetailsStyles.heading}>{pokemon.name}</Text>
              <Text style={PokemonDetailsStyles.cardNumber}>
                {addLeadingZeros(pokemon.id)}
              </Text>
            </View>
            <View
              style={[PokemonDetailsStyles.item, PokemonDetailsStyles.close]}>
              <TouchableOpacity onPress={onClose}>
                <Image
                  source={require('../../assets/icons/remove.png')}
                  style={PokemonDetailsStyles.icon}
                  accessibilityLabel="Go back to Pokemon Listing Page"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={PokemonDetailsStyles.row}>
            <View style={PokemonDetailsStyles.item}>
              <View style={PokemonDetailsStyles.card}>
                <LinearGradient colors={['#acb6e5', '#86fde8']}>
                  <View style={PokemonDetailsStyles.image}>
                    <Image
                      source={{
                        uri: `${process.env.IMAGE_URL}/${transformedId}.png`,
                      }}
                      style={PokemonDetailsStyles.imgSize}
                      accessibilityLabel="Pokemon Card Image"
                    />
                  </View>
                </LinearGradient>
              </View>
            </View>

            <View
              style={[
                PokemonDetailsStyles.item,
                PokemonDetailsStyles.description,
              ]}>
              <Text
                style={PokemonDetailsStyles.descriptionText}
                numberOfLines={10}>
                {pokemonDescription ? (
                  concatenateProperty(
                    pokemonDescription.flavor_text_entries.filter(
                      item => item.language.name === 'en',
                    ),
                    'flavor_text',
                  )
                ) : (
                  <ActivityIndicator />
                )}
              </Text>
              <TouchableOpacity onPress={handleReadMore}>
                <Text style={PokemonDetailsStyles.readMore}>{READ_MORE}</Text>
              </TouchableOpacity>
              <Modal
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
                visible={modalVisible}>
                <View style={PokemonDetailsStyles.modalContainer}>
                  <View>
                    <ScrollView>
                      <Text style={PokemonDetailsStyles.modalDescription}>
                        {pokemonDescription &&
                          concatenateProperty(
                            pokemonDescription.flavor_text_entries.filter(
                              item => item.language.name === 'en',
                            ),
                            'flavor_text',
                          )}
                      </Text>
                    </ScrollView>
                  </View>

                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Text style={PokemonDetailsStyles.closeButton}>
                      <Image
                        source={require('../../assets/icons/cancel.png')}
                        style={PokemonDetailsStyles.icon}
                        accessibilityLabel="Close button for Modal Close"
                      />
                    </Text>
                  </TouchableOpacity>
                </View>
              </Modal>
            </View>
          </View>

          <View
            style={[
              PokemonDetailsStyles.row,
              PokemonDetailsStyles.detailSection,
            ]}>
            <View style={[PokemonDetailsStyles.item, PokemonDetailsStyles.col]}>
              <Text style={PokemonDetailsStyles.label}>{GENDER}</Text>
              <View style={PokemonDetailsStyles.fdrow}>
                {genderList &&
                  genderList.map((item, index) => (
                    <Text style={PokemonDetailsStyles.value} key={index}>
                      {item}
                      {index !== genderList.length - 1 && <Text>, </Text>}
                    </Text>
                  ))}
              </View>
            </View>
            <View style={[PokemonDetailsStyles.item, PokemonDetailsStyles.col]}>
              <Text style={PokemonDetailsStyles.label}>{WEIGHT}</Text>
              <View>
                <Text style={[PokemonDetailsStyles.value]}>
                  {covert_Weight_to_Kg(pokemon.weight)}
                </Text>
              </View>
            </View>
          </View>
          <View style={PokemonDetailsStyles.row}>
            <View style={[PokemonDetailsStyles.item, PokemonDetailsStyles.col]}>
              <Text style={PokemonDetailsStyles.label}>{HEIGHT}</Text>
              <View style={PokemonDetailsStyles.fdrow}>
                <Text style={[PokemonDetailsStyles.value]}>
                  {meters_to_feet_and_inches(pokemon.height)}
                </Text>
              </View>
            </View>
            <View style={[PokemonDetailsStyles.item, PokemonDetailsStyles.col]}>
              <Text style={PokemonDetailsStyles.label}>{TYPES}</Text>
              <View style={PokemonDetailsStyles.fdrow}>
                {pokemon.types.map(item => (
                  <View
                    key={item.slot}
                    style={PokemonDetailsStyles.typeSection}>
                    <BadgeButton badgeText={item.type.name} />
                  </View>
                ))}
              </View>
            </View>
          </View>

          <View style={PokemonDetailsStyles.row}>
            <View style={[PokemonDetailsStyles.item, PokemonDetailsStyles.col]}>
              <Text style={PokemonDetailsStyles.label}>
                {POKEMON_ABILITIES}
              </Text>
              <View style={PokemonDetailsStyles.fdrow}>
                {pokemon &&
                  pokemon.abilities.map((item, index) => (
                    <View key={item.slot}>
                      <Text style={PokemonDetailsStyles.value}>
                        {item.ability.name}
                        {index !== pokemon.length - 1 && <Text>, </Text>}
                      </Text>
                    </View>
                  ))}
              </View>
            </View>
            <View style={[PokemonDetailsStyles.item, PokemonDetailsStyles.col]}>
              <Text style={PokemonDetailsStyles.label}>Egg Groups</Text>
              <View style={PokemonDetailsStyles.fdrow}>
                {pokemonDescription &&
                  pokemonDescription.egg_groups.map((item, index) => (
                    <View key={index} style={{paddingRight: 10, paddingTop: 5}}>
                      <BadgeButton badgeText={item.name} />
                    </View>
                  ))}
              </View>
            </View>
          </View>
          <View style={PokemonDetailsStyles.row}>
            <View style={[PokemonDetailsStyles.item, PokemonDetailsStyles.col]}>
              <Text style={PokemonDetailsStyles.label}>{WEAK_AGAINST}</Text>
              {state.loading ? (
                <ActivityIndicator />
              ) : (
                <View style={PokemonDetailsStyles.fdrow}>
                  {state.pokemonType &&
                    state.pokemonType.map((item, index) => (
                      <View
                        key={index}
                        style={{paddingRight: 10, paddingTop: 5}}>
                        <BadgeButton badgeText={item.name} />
                      </View>
                    ))}
                </View>
              )}
            </View>
          </View>
        </View>

        <View style={PokemonDetailsStyles.progressBarSection}>
          <Text style={PokemonDetailsStyles.statsTitle}>Stats</Text>
          {pokemon.stats.map((stat, index) => (
            <View style={PokemonDetailsStyles.containerStats} key={index}>
              <Text style={PokemonDetailsStyles.labelStats}>
                {stat.stat.name}
              </Text>
              <View>
                <ProgressBar
                  color={COLOR_TOKEN.dark_navy_blue}
                  thickness={2}
                  progress={stat.base_stat / 100}
                  width={220}
                  height={10}
                  borderRadius={0}
                  unfilledColor="#CBD5ED"
                />
                <Text style={PokemonDetailsStyles.percentage}>
                  {stat.base_stat}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PokemonDetailComponent;
