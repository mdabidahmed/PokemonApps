import {StyleSheet} from 'react-native';
const PokemonDetailsStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: '#FAFCEA',
  },
  readMore: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  row: {
    flexDirection: 'row',
  },
  col: {width: '50%'},
  description: {
    width: 200,
  },
  descriptionText: {
    color: 'black',
    fontSize: 16,
  },
  item: {
    margin: 5,
  },
  close: {
    flex: 1,
    alignItems: 'flex-end',
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A237E',
  },
  fdrow: {
    flexDirection: 'row',
  },
  value: {
    textTransform: 'capitalize',
    fontSize: 16,
    fontWeight: '400',
    color: '#1A237E',
    paddingVertical: 10,
  },
  heading: {
    fontSize: 26,
    fontWeight: '700',
    color: '#191654',
    textTransform: 'uppercase',
    fontFamily: 'roboto',
    letterSpacing: 1,
  },
  card: {
    borderWidth: 1.5,
    color: '#1A237E',
    borderRadius: 10,
    borderStyle: 'dashed',
    shadowColor: '#171717',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    overflow: 'hidden',
  },
  image: {padding: 10},
  cardNumber: {
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'roboto',
    letterSpacing: 1,
    color: '#191654',
  },
  modalContainer: {
    backgroundColor: '#0f0c29',
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 150,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: 'white',
  },
  closeButton: {
    position: 'absolute',
    bottom: 320,
    left: 140,
    width: 30,
    height: 32,
  },
  sectionRight: {
    paddingLeft: 100,
  },
  containerStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  labelStats: {
    paddingLeft: 20,
    color: '#11114e',
    width: '35%',
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  progressBarSection: {
    backgroundColor: '#cfead9',
    paddingTop: 20,
  },
  statsTitle: {
    fontSize: 20,
    color: '#191654',
    textAlign: 'left',
    paddingLeft: 20,
    marginBottom: 18,
    fontWeight: '700',
  },
  percentage: {
    position: 'absolute',
    top: 0,
    left: 10,
    right: 0,
    bottom: 0,
    textAlign: 'left',
    color: '#fff',
    fontSize: 8,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  imgSize: {
    width: 160,
    height: 200,
    resizeMode: 'contain',
  },
  detailSection: {
    marginTop: 20,
  },
});

export default PokemonDetailsStyles;
