import {StyleSheet} from 'react-native';
export const HeaderStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 16,
    color: '#302b63',
    lineHeight: 26,
    marginBottom: 5,
    fontWeight: '600',
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,

    marginVertical: 5,
  },
  logo: {
    paddingVertical: 6,
  },
  imageSize: {
    width: 150,
    height: 50,
    resizeMode: 'contain',
  },
});
