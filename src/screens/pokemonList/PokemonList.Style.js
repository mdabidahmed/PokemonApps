import {StyleSheet} from 'react-native';
import {COLOR_TOKEN} from '../../tokens/colors';
import {FONT_SIZE, FONT_WEIGHT} from '../../tokens/fonts';
import {SIZES} from '../../tokens/size';
import {ICON} from '../../tokens/spacing';
export const PokemonListStyles = StyleSheet.create({
  container: {
    backgroundColor: COLOR_TOKEN.light_green_color_bg,
    flex: 1,
    borderColor: COLOR_TOKEN.light_green_color_bg,
    borderBottomWidth: 100,
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
  },
  input: {
    fontSize: FONT_SIZE.MD,
    backgroundColor: COLOR_TOKEN.white,
    borderRadius: SIZES.xxs,
    marginLeft: 16,
    paddingLeft: 8,
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
    paddingVertical: 4,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: COLOR_TOKEN.primary,
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
  filterButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: COLOR_TOKEN.btn_bg,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    margin: 2,
  },
  buttonText: {
    color: COLOR_TOKEN.white,
    fontSize: FONT_SIZE.MD,
  },
  icon: {
    width: ICON.DEFAULT_SIZE,
    height: ICON.DEFAULT_SIZE,
    resizeMode: 'contain',
  },
  item: {
    margin: 5,
  },
  close: {
    flex: 1,
    alignItems: 'flex-end',
  },
  box: {
    borderWidth: 2,
    borderColor: COLOR_TOKEN.black,
    paddingHorizontal: 20,
    paddingBottom: 20,
    margin: 20,
    borderRadius: 10,
  },
  header: {
    fontSize: FONT_SIZE.XXL,
    fontWeight: FONT_WEIGHT.BOLD,
    color: COLOR_TOKEN.black,
    paddingHorizontal: 20,
    marginVertical: 20,
    color: COLOR_TOKEN.black,
    borderBottomWidth: 0.5,
  },
  type: {
    fontSize: FONT_SIZE.MD,
    fontWeight: FONT_WEIGHT.BOLD,
    paddingVertical: 10,
    color: COLOR_TOKEN.black,
    borderBottomWidth: 0.5,
    borderBottomColor: COLOR_TOKEN.black,
  },
  closeContainer: {
    margin: 20,
  },
  checkboxSections: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
  },
  checkboxValue: {
    marginLeft: 5,
  },
});
