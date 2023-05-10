import {StyleSheet} from 'react-native';
export const ButtonStyles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    marginTop: 5,
  },
  badge: {
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingTop: 3,
    paddingBottom: 4,
    borderWidth: 1,
    borderColor: 'black',
  },
  badgeText: {
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    textAlignVertical: 'center',
    textTransform: 'capitalize',
  },
  borderRadiusButton: {
    borderRadius: 5,
  },
});
