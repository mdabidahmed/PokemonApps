import {StyleSheet} from 'react-native';
import {COLOR_TOKEN} from '../../tokens/colors';
import {FONT_FAMILY, FONT_SIZE, FONT_WEIGHT} from '../../tokens/fonts';
import {SPACING} from '../../tokens/spacing';
const CardStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
  },
  card: {
    borderWidth: 1.5,
    color: COLOR_TOKEN.primary,
    borderRadius: 10,
    borderStyle: 'dashed',
    marginVertical: SPACING.MARGIN_SM,
    marginHorizontal: SPACING.MARGIN_SM,
    shadowColor: '#171717',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    overflow: 'hidden',
  },
  heading: {
    fontSize: FONT_SIZE.XL,
    fontWeight: FONT_WEIGHT.BOLD,
    textAlign: 'center',
    color: COLOR_TOKEN.primary,
    textTransform: 'capitalize',
    fontFamily: FONT_FAMILY.PRIMARY,
    letterSpacing: 1,
  },
  cardContent: {paddingBottom: SPACING.MARGIN_MD},
  imageCard: {
    width: 180,
    height: 160,
    resizeMode: 'cover',
  },
});

export default CardStyles;
