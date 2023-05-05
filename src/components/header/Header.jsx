import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const HeaderComponent = ({title, description}) => {
  return (
    <View style={HeaderStyles.container}>
      <View style={HeaderStyles.logo}>
        <Image
          style={{width: 150, height: 50, resizeMode: 'contain'}}
          source={{uri: process.env.LOGO_IMAGE_URL}}
        />
      </View>
      <View style={HeaderStyles.line} />
      <Text style={HeaderStyles.description}>{description}</Text>
    </View>
  );
};

const HeaderStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 16,
    color: '#302b63',
    lineHeight: 26,
    marginBottom: 5,
    fontWeight: '600',
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,

    marginVertical: 5,
  },
  logo: {
    paddingVertical: 6,
  },
});

export default HeaderComponent;
