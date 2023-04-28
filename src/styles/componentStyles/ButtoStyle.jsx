/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

const ButtonStyles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5,
    // backgroundColor: '#007bff', // Primary color
  },
  text: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ButtonStyles;

//-------------------------------------------------
// import React from 'react';
// import { TouchableOpacity, Text } from 'react-native';
// import ButtonStyles from './ButtonStyles';

// const Button = ({ title, onPress }) => {
//   return (
//     <TouchableOpacity style={ButtonStyles.container} onPress={onPress}>
//       <Text style={ButtonStyles.text}>{title}</Text>
//     </TouchableOpacity>
//   );
// };

// export default Button;
//-------------------------------------------------------
