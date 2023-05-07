import {StyleSheet} from 'react-native';
import {COLOR_TOKEN} from '../../tokens/colors';
import {FONT_SIZE, FONT_WEIGHT} from '../../tokens/fonts';
import {SIZES} from '../../tokens/size';
import {ICON} from '../../tokens/spacing';
export const PokemonListStyles = StyleSheet.create({
  container: {
    backgroundColor: COLOR_TOKEN.light_green_color_bg,
    // alignItems: 'center',
    // justifyContent: 'center',
    // alignSelf: 'center',
    flex: 1,
    // flexGrow: 1,
    // marginBottom: 100,
    borderColor: COLOR_TOKEN.light_green_color_bg,
    borderBottomWidth: 100,
    // borderColor: 'black',
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
    // paddingHorizontal: SIZES.xs,
  },
  input: {
    // paddingVertical: SIZES.xxs,
    fontSize: FONT_SIZE.MD,
    backgroundColor: COLOR_TOKEN.white,
    borderRadius: SIZES.xxs,
    marginLeft: 16,
    paddingLeft: 8,
    // marginVertical: SIZES.xxxs,
    marginRight: 8,
    borderColor: COLOR_TOKEN.primary,
    borderWidth: 2,
    width: '77%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationSection: {
    // width: '100%',
    // height: SIZES.xxs,
    paddingVertical: 4,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    // alignItems: 'center',
    backgroundColor: COLOR_TOKEN.primary,
    // width: 420,
  },
  prevBtn: {
    marginRight: SIZES.sm,
  },
  filter: {
    width: SIZES.xl,
    height: SIZES.xl,
    padding: 25,
    borderRadius: SIZES.xxxs,
    backgroundColor: COLOR_TOKEN.primary,
    borderColor: COLOR_TOKEN.primary,
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: ICON.DEFAULT_SIZE,
    height: ICON.DEFAULT_SIZE,
    resizeMode: 'contain',
  },
  cardContainer: {
    height: '90%',
  },
  headerContainer: {
    // marginTop: 160,
  },
});
