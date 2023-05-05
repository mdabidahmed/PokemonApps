import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {generateRandomColor} from '../../../utils/randomColor';
const BadgeButton = ({badgeText, onPress}) => {
  const [backgroundColor, setBackgroundColor] = useState('#FCC1B0');
  useEffect(() => {
    setBackgroundColor(generateRandomColor());
  }, []);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <View style={{backgroundColor: backgroundColor, borderRadius: 5}}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badgeText}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    marginTop: 5,
  },
  badge: {
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingTop: 3,
    paddingBottom: 4,
    borderWidth: 1,
    borderColor: 'black',
  },
  badgeText: {
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    textAlignVertical: 'center',
    textTransform: 'capitalize',
  },
});

export default BadgeButton;
