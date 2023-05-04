import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const HeaderComponent = ({title, description}) => {
  return (
    <View style={HeaderStyles.container}>
      <Text style={HeaderStyles.title}>{title}</Text>
      <View style={HeaderStyles.line} />
      <Text style={HeaderStyles.description}>{description}</Text>
    </View>
  );
};

const HeaderStyles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 10,

    color: '#302b63',
    letterSpacing: 1,
    // fontFamily: 'roboto',
  },
  description: {
    fontSize: 16,
    // textAlign: 'center',
    color: '#302b63',
    lineHeight: 26,
    marginBottom: 5,
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,

    marginVertical: 5,
  },
});

export default HeaderComponent;
