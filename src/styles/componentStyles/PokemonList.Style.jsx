import {StyleSheet} from 'react-native';
export const PokemonListStyles = StyleSheet.create({
  container: {
    backgroundColor: '#cfead9',
  },
  button: {
    position: 'absolute',
    backgroundColor: '#2196F3',
    borderRadius: 10,
    paddingVertical: 10,
  },
  title: {
    color: '#ffffff',
    fontWeight: '700',
  },
  filterContainer: {
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    borderRadius: 10,
    paddingHorizontal: 10,
  },
  input: {
    paddingVertical: 8,
    fontSize: 18,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 4,
    marginVertical: 4,
    marginRight: 8,
    borderColor: '#1A237E',
    borderWidth: 2,
    width: '80%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationSection: {
    width: '100%',
    height: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#fff',
  },
  prevBtn: {
    marginRight: 20,
  },
  filter: {
    width: 60,
    height: 45,
    borderRadius: 5,
    backgroundColor: '#1A237E',
    borderColor: '#1A237E',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  cardContainer: {
    height: 480,
  },
});
