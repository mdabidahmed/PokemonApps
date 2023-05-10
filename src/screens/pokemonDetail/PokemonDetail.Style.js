import {StyleSheet} from 'react-native';
import {COLOR_TOKEN} from '../../tokens/colors';
import {FONT_FAMILY, FONT_SIZE, FONT_WEIGHT} from '../../tokens/fonts';
import {SIZES} from '../../tokens/size';
import {ICON, SPACING} from '../../tokens/spacing';
const PokemonDetailsStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingHorizontal: SPACING.PADDING_MD,
    paddingVertical: SPACING.PADDING_LG,
    backgroundColor: COLOR_TOKEN.light_yellow_bg,
  },
  readMore: {
    color: COLOR_TOKEN.blue500,
    textDecorationLine: 'underline',
    fontWeight: FONT_WEIGHT.MEDIUM,
    paddingHorizontal: SIZES.sm,
  },
  row: {
    flexDirection: 'row',
  },
  col: {width: '50%'},
  description: {
    width: 200,
  },
  descriptionText: {
    color: COLOR_TOKEN.primary,
    fontSize: FONT_SIZE.MD,
    paddingHorizontal: SIZES.sm,
  },

  label: {
    fontSize: FONT_SIZE.MD,
    fontWeight: FONT_WEIGHT.BOLD,
    color: COLOR_TOKEN.primary,
  },
  fdrow: {
    flexDirection: 'row',
  },
  value: {
    textTransform: 'capitalize',
    fontSize: FONT_SIZE.MD,
    fontWeight: FONT_WEIGHT.REGULAR,
    color: COLOR_TOKEN.primary,
    paddingVertical: SIZES.xs,
  },
  heading: {
    fontSize: FONT_SIZE.XXXL,
    fontWeight: FONT_WEIGHT.BOLD,
    color: COLOR_TOKEN.primary,
    textTransform: 'uppercase',
    fontFamily: FONT_FAMILY.PRIMARY,
    letterSpacing: 1,
  },
  card: {
    borderWidth: 1.5,
    color: COLOR_TOKEN.primary,
    borderRadius: SIZES.xs,
    borderStyle: 'dashed',
    shadowColor: '#171717',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    overflow: 'hidden',
  },
  image: {padding: SIZES.xs},
  cardNumber: {
    fontSize: FONT_SIZE.XXXL,
    fontWeight: FONT_WEIGHT.BOLD,
    fontFamily: FONT_FAMILY.PRIMARY,
    letterSpacing: 1,
    color: COLOR_TOKEN.primary,
  },
  modalContainer: {
    backgroundColor: COLOR_TOKEN.dark_blue_bg,
    padding: SPACING.PADDING_LG,
    borderRadius: SIZES.xs,
    marginHorizontal: SIZES.sm,
    marginVertical: 150,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalDescription: {
    fontSize: FONT_SIZE.MD,
    lineHeight: SIZES.sm,
    color: COLOR_TOKEN.white,
  },
  closeButton: {
    position: 'absolute',
    bottom: 320,
    left: 140,
    width: SIZES.md,
    height: SIZES.md,
  },
  sectionRight: {
    paddingLeft: 100,
  },
  containerStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.PADDING_MD,
  },
  labelStats: {
    paddingLeft: SIZES.sm,
    color: COLOR_TOKEN.dark_navy_blue,
    width: '35%',
    fontWeight: FONT_WEIGHT.BOLD,
    textTransform: 'capitalize',
  },
  progressBarSection: {
    backgroundColor: '#cfead9',
    paddingTop: SIZES.sm,
  },
  statsTitle: {
    fontSize: FONT_SIZE.XL,
    color: '#191654',
    textAlign: 'left',
    paddingLeft: SIZES.sm,
    marginBottom: SIZES.sm,
    fontWeight: FONT_WEIGHT.BOLD,
  },
  percentage: {
    position: 'absolute',
    top: 0,
    left: SIZES.xs,
    right: 0,
    bottom: 0,
    textAlign: 'left',
    color: '#fff',
    fontSize: FONT_SIZE.XXS,
  },
  icon: {
    width: ICON.DEFAULT_SIZE,
    height: ICON.DEFAULT_SIZE,
    resizeMode: 'contain',
  },
  item: {
    margin: SIZES.xxxs,
  },
  close: {
    flex: 1,
    alignItems: 'flex-end',
  },
  imgSize: {
    width: 160,
    height: 200,
    resizeMode: 'contain',
  },
  detailSection: {
    marginTop: SIZES.sm,
  },
  typeSection: {
    marginRight: SIZES.xs,
    paddingTop: SIZES.xxs,
  },
});

export default PokemonDetailsStyles;
