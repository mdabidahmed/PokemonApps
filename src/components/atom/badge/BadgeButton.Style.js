import {StyleSheet} from 'react-native';
import {COLOR_TOKEN} from '../../../tokens/colors';
import {FONT_SIZE, FONT_WEIGHT} from '../../../tokens/fonts';
export const ButtonStyles = StyleSheet.create({
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
    borderColor: COLOR_TOKEN.black,
  },
  badgeText: {
    color: 'black',
    fontSize: FONT_SIZE.SM,
    fontWeight: FONT_WEIGHT.REGULAR,
    textAlign: 'center',
    textAlignVertical: 'center',
    textTransform: 'capitalize',
  },
  borderRadiusButton: {
    borderRadius: 5,
  },
});
