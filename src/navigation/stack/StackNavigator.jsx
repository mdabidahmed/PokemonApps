import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';

import PokemonDetailComponent from '../../screens/PokemonDetail';
import PokemonListComponent from '../../screens/PokemonList';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="Pokemon list"
          component={PokemonListComponent}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Pokemon Details"
          component={PokemonDetailComponent}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
