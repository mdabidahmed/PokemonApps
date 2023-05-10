import * as React from 'react';
import {PokemonProvider} from './src/components/organism/context/PokemonProvider';
import Navigation from './src/navigation/stack/StackNavigator';
const App = () => {
  return (
    <PokemonProvider>
      <Navigation />
    </PokemonProvider>
  );
};

export default App;
