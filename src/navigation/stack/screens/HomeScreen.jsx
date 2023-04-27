import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import navigateToScreen from '../../../utils/navigate';
const HomeScreenComponent = ({ navigation }) => {
  // const handleCardPress = (screenName) => {
  //   navigation.navigate(screenName);
  // };

  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity
          onPress={() => navigateToScreen(navigation, 'DetailsPage')}
        >
          <Text>Home Component</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

}

export default HomeScreenComponent;


