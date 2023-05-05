import React from 'react';
import {Image, Text, View} from 'react-native';
import {HeaderStyles} from '../../../styles/componentStyles/HeaderStyles';
const HeaderComponent = ({title, description}) => {
  return (
    <View style={HeaderStyles.container}>
      <View style={HeaderStyles.logo}>
        <Image
          style={HeaderStyles.imageSize}
          source={{uri: process.env.LOGO_IMAGE_URL}}
          accessibilityLabel="Pokemon Logo image"
        />
      </View>
      <View style={HeaderStyles.line} />
      <Text style={HeaderStyles.description}>{description}</Text>
    </View>
  );
};

export default HeaderComponent;
