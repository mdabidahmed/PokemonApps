import {StyleSheet} from 'react-native';
import {SIZES} from '../../../tokens/size';
export const LoaderStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: SIZES.xs,
  },
});
