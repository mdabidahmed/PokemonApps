import {StyleSheet} from 'react-native';
const CardStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
  },
  card: {
    borderWidth: 1.5,
    color: '#1A237E',
    borderRadius: 10,
    borderStyle: 'dashed',
    marginVertical: 10,
    marginHorizontal: 10,
    shadowColor: '#171717',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    overflow: 'hidden',
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: '#1A237E',
    textTransform: 'capitalize',
    fontFamily: 'roboto',
    letterSpacing: 1,
  },
  cardContent: {paddingBottom: 20},
  imageCard: {
    width: 180,
    height: 160,
    resizeMode: 'cover',
  },
});

export default CardStyles;
