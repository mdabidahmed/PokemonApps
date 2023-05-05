import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {
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
import BadgeButton from '../components/BadgeButton';
import {PokemonContext} from '../context/PokemonContext';
import {getPokemonType} from '../services/api';
import PokemonDetailsStyles from '../styles/componentStyles/PokemonDetail.Style';
import {addLeadingZeros} from '../utils/leadingZeros';
import {meters_to_feet_and_inches} from '../utils/lengthUtils';
import {covert_Weight_to_Kg} from '../utils/weightUtils';
const PokemonDetailComponent = item => {
  const pokemon = item.route.params.item;
  const [modalVisible, setModalVisible] = useState(false);
  const [weakAgainst, setWeakAgainst] = useState([]);
  const navigation = useNavigation();
  const {genderList, pokemonDescription, fetchGender} =
    useContext(PokemonContext);

  useEffect(() => {
    findPokemonWeakness();
  }, [weakAgainst]);

  const findPokemonWeakness = () => {
    const id = pokemon.id;
    getPokemonType(id).then(response => {
      setWeakAgainst(response.data.damage_relations.double_damage_from);
    });
  };

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
                  source={require('../assets/remove.png')}
                  style={PokemonDetailsStyles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={PokemonDetailsStyles.row}>
            <View style={PokemonDetailsStyles.item}>
              <View style={PokemonDetailsStyles.card}>
                <LinearGradient
                  colors={['#acb6e5', '#86fde8']}
                  style={{borderRadius: 10}}>
                  <View style={PokemonDetailsStyles.image}>
                    <Image
                      source={{
                        uri: `${process.env.IMAGE_URL}/${transformedId}.png`,
                      }}
                      style={PokemonDetailsStyles.imgSize}
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
              <Text style={PokemonDetailsStyles.descriptionText}>
                {pokemonDescription &&
                  pokemonDescription.flavor_text_entries.find(
                    entry => entry.language.name === 'en',
                  ).flavor_text}
              </Text>
              <TouchableOpacity onPress={handleReadMore}>
                <Text style={PokemonDetailsStyles.readMore}>... Read More</Text>
              </TouchableOpacity>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}>
                <View style={PokemonDetailsStyles.modalContainer}>
                  <Text style={PokemonDetailsStyles.modalDescription}>
                    {pokemonDescription &&
                      pokemonDescription.flavor_text_entries
                        .filter(item => item.language.name === 'en')
                        .map((res, index) => (
                          <Text key={index}>{res.flavor_text}</Text>
                        ))}
                  </Text>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Text style={PokemonDetailsStyles.closeButton}>
                      <Image
                        source={require('../assets/cancel.png')}
                        style={PokemonDetailsStyles.icon}
                      />
                    </Text>
                  </TouchableOpacity>
                </View>
              </Modal>
            </View>
          </View>
          <View style={PokemonDetailsStyles.row}>
            <View style={[PokemonDetailsStyles.item, PokemonDetailsStyles.col]}>
              <Text style={PokemonDetailsStyles.label}>Gender(s)</Text>
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
              <Text style={PokemonDetailsStyles.label}>Weight</Text>
              <View>
                <Text style={[PokemonDetailsStyles.value]}>
                  {covert_Weight_to_Kg(pokemon.weight)}
                </Text>
              </View>
            </View>
          </View>
          <View style={PokemonDetailsStyles.row}>
            <View style={[PokemonDetailsStyles.item, PokemonDetailsStyles.col]}>
              <Text style={PokemonDetailsStyles.label}>Height</Text>
              <View style={PokemonDetailsStyles.fdrow}>
                <Text style={[PokemonDetailsStyles.value]}>
                  {meters_to_feet_and_inches(pokemon.height)}
                </Text>
              </View>
            </View>
            <View style={[PokemonDetailsStyles.item, PokemonDetailsStyles.col]}>
              <Text style={PokemonDetailsStyles.label}>Types</Text>
              <View style={PokemonDetailsStyles.fdrow}>
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

          <View style={PokemonDetailsStyles.row}>
            <View style={[PokemonDetailsStyles.item, PokemonDetailsStyles.col]}>
              <Text style={PokemonDetailsStyles.label}>Abilities</Text>
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
              <Text style={PokemonDetailsStyles.label}>Weak Against</Text>
              <View style={PokemonDetailsStyles.fdrow}>
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

        <View style={PokemonDetailsStyles.progressBarSection}>
          <Text style={PokemonDetailsStyles.statsTitle}>Stats</Text>
          {pokemon.stats.map((stat, index) => (
            <View style={PokemonDetailsStyles.containerStats} key={index}>
              <Text style={PokemonDetailsStyles.labelStats}>
                {stat.stat.name}
              </Text>
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
