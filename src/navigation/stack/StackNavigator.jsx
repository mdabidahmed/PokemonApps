import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import DetailsScreenComponent from './screens/DetailsScreen';
import HomeScreenComponent from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomePage" component={HomeScreenComponent} />
        <Stack.Screen name="DetailsPage" component={DetailsScreenComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;