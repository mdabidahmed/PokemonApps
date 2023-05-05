import {StyleSheet} from 'react-native';
import {COLOR_TOKEN} from '../../tokens/colors';
import {FONT_SIZE, FONT_WEIGHT} from '../../tokens/fonts';
import {SPACING} from '../../tokens/spacing';
export const HeaderStyles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.MARGIN_MD,
  },
  description: {
    fontSize: FONT_SIZE.MD,
    color: COLOR_TOKEN.gray900,
    lineHeight: 26,
    marginBottom: SPACING.MARGIN_XS,
    fontWeight: FONT_WEIGHT.MEDIUM,
  },
  line: {
    borderBottomColor: COLOR_TOKEN.primary,
    borderBottomWidth: 0.5,

    marginVertical: SPACING.MARGIN_XS,
  },
  logo: {
    paddingVertical: SPACING.PADDING_SM,
  },
  imageSize: {
    width: 150,
    height: 50,
    resizeMode: 'contain',
  },
});
