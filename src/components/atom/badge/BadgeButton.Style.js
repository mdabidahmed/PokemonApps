import {StyleSheet} from 'react-native';
import {COLOR_TOKEN} from '../../../tokens/colors';
import {FONT_SIZE, FONT_WEIGHT} from '../../../tokens/fonts';
import {SIZES} from '../../../tokens/size';
import {SPACING} from '../../../tokens/spacing';
export const ButtonStyles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    marginTop: SPACING.MARGIN_XS,
  },
  badge: {
    borderRadius: SIZES.xxxs,
    paddingHorizontal: SIZES.xs,
    paddingTop: 3,
    paddingBottom: SPACING.PADDING_XS,
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
    borderRadius: SIZES.xxxs,
  },
});
