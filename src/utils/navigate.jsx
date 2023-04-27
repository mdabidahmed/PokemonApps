import { CommonActions } from '@react-navigation/native';

// Function to navigate to a specific screen
const navigateToScreen = (navigation, screenName) => {
  navigation.dispatch(
    CommonActions.navigate({
      name: screenName,
    }),
  );
};

export default navigateToScreen;