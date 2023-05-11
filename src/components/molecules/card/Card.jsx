import {useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, SINGLE_COLOR} from '../../../constants/color/color';
import {PokemonContext} from '../../organism/context/PokemonContext';
import CardStyles from './Card.Style';

import {addLeadingZeros} from '../../../utils/leadingZeros/leadingZeros';
const Card = ({pokemon}) => {
  const navigation = useNavigation();

  const {fetchDescription} = useContext(PokemonContext);

  const renderItem = ({item}) => {
    const multiColors = item?.types?.map(({type}) => COLORS[type['name']]);
    const id = addLeadingZeros(item.id);

    const handlePress = () => {
      fetchDescription(item.id);
      navigation.navigate('Pokemon Details', {item});
    };

    const ColorGenerate = () => {
      return multiColors.length >= 2 ? multiColors : SINGLE_COLOR;
    };
    return (
      <TouchableOpacity onPress={handlePress}>
        <View style={CardStyles.card}>
          <LinearGradient colors={ColorGenerate()}>
            <Image
              source={{
                uri: `${process.env.IMAGE_URL}/${id}.png`,
              }}
              accessibilityLabel="Pokemon Card List"
              style={CardStyles.imageCard}
            />

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

export default Card;
