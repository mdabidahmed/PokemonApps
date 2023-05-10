import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import PokemonDetailComponent from '../../screens/pokemonDetail/PokemonDetail';
import PokemonListComponent from '../../screens/pokemonList/PokemonList';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="Pokemon list"
          component={PokemonListComponent}
          testID="pokemon-list-item-1"
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Pokemon Details"
          component={PokemonDetailComponent}
          testID="pokemon-detail-title"
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
