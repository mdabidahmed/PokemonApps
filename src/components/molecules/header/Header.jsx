import React from 'react';
import {Image, SafeAreaView, Text, View} from 'react-native';
import {HeaderStyles} from './HeaderStyles';
const HeaderComponent = ({title, description}) => {
  return (
    <SafeAreaView style={HeaderStyles.container}>
      <View style={HeaderStyles.logo}>
        <Image
          style={HeaderStyles.imageSize}
          source={{uri: process.env.LOGO_IMAGE_URL}}
          accessibilityLabel="Pokemon Logo image"
        />
      </View>
      <View style={HeaderStyles.containerLine}>
        <View style={HeaderStyles.line} />
      </View>

      <Text style={HeaderStyles.description}>{description}</Text>
    </SafeAreaView>
  );
};

export default HeaderComponent;
