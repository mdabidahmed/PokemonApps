import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {generateRandomColor} from '../../../utils/randomColor/randomColor';
import {ButtonStyles} from './BadgeButton.Style';

const BadgeButton = ({badgeText, onPress}) => {
  const [backgroundColor, setBackgroundColor] = useState('#FCC1B0');
  useEffect(() => {
    setBackgroundColor(generateRandomColor());
  }, []);

  return (
    <TouchableOpacity onPress={onPress} testID="badge-button">
      <View style={ButtonStyles.button}>
        <View
          style={[
            {backgroundColor: backgroundColor},
            ButtonStyles.borderRadiusButton,
          ]}>
          <View style={ButtonStyles.badge}>
            <Text style={ButtonStyles.badgeText}>{badgeText}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BadgeButton;
