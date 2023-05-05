import {StyleSheet} from 'react-native';
import {COLOR_TOKEN} from '../../tokens/colors';
import {FONT_SIZE, FONT_WEIGHT} from '../../tokens/fonts';
import {SIZES} from '../../tokens/size';
import {ICON} from '../../tokens/spacing';
export const PokemonListStyles = StyleSheet.create({
  container: {
    backgroundColor: COLOR_TOKEN.light_green_color_bg,
  },
  button: {
    position: 'absolute',
    backgroundColor: COLOR_TOKEN.light_green_color,
    borderRadius: SIZES.xs,
    paddingVertical: 10,
  },
  title: {
    color: COLOR_TOKEN.white,
    fontWeight: FONT_WEIGHT.BOLD,
  },
  filterContainer: {
    padding: SIZES.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    borderRadius: SIZES.xs,
    paddingHorizontal: SIZES.xs,
  },
  input: {
    paddingVertical: SIZES.xxs,
    fontSize: FONT_SIZE.MD,
    backgroundColor: COLOR_TOKEN.white,
    borderRadius: SIZES.xxs,
    padding: SIZES.xxxs,
    marginVertical: SIZES.xxxs,
    marginRight: SIZES.xxs,
    borderColor: COLOR_TOKEN.primary,
    borderWidth: 2,
    width: '82%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationSection: {
    width: '100%',
    height: SIZES.xs,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: COLOR_TOKEN.white,
  },
  prevBtn: {
    marginRight: SIZES.sm,
  },
  filter: {
    width: 60,
    height: 45,
    borderRadius: SIZES.xxxs,
    backgroundColor: COLOR_TOKEN.primary,
    borderColor: COLOR_TOKEN.primary,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: ICON.DEFAULT_SIZE,
    height: ICON.DEFAULT_SIZE,
    resizeMode: 'contain',
  },
  cardContainer: {
    height: 480,
  },
});
