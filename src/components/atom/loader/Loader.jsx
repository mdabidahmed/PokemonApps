import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {LoaderStyles} from '../../../styles/componentStyles/Loader.Style';

const Loader = () => (
  <View
    style={[LoaderStyles.container, LoaderStyles.horizontal]}
    testID="loader">
    <ActivityIndicator />
  </View>
);

export default Loader;
