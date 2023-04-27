import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

const DetailsScreenComponent = () => (
  <SafeAreaView style={styles.container}>
    <View>
      <Text>Details</Text>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
});

export default DetailsScreenComponent;
