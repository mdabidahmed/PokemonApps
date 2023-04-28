import React from 'react';
import {Image, Text, View} from 'react-native';
const Pokeinfo = ({data}) => {
  return (
    <View>
      {!data ? (
        ''
      ) : (
        <View>
          <Text>{data.name}</Text>
          <Image
            source={{
              uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`,
            }}
          />
          <View>
            {data.abilities.map(poke => {
              return (
                <View>
                  <Text>{poke.ability.name}</Text>
                </View>
              );
            })}
          </View>
          <View>
            {data.stats.map(poke => {
              return (
                <>
                  <Text>
                    {poke.stat.name}:{poke.base_stat}
                  </Text>
                </>
              );
            })}
          </View>
        </View>
      )}
    </View>
  );
};
export default Pokeinfo;
