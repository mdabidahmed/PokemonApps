import React from 'react';
import BadgeButton from '../badge/BadgeButton';

import {fireEvent, render} from '@testing-library/react-native';

describe('<BadgeButton />', () => {
  it('renders correctly', async () => {
    const {getByText} = render(<BadgeButton badgeText="Button" />);
    await expect(getByText('Button')).toBeDefined();
  });

  it('calls onPress function when pressed', async () => {
    const onPress = jest.fn();
    const {getByTestId} = render(
      <BadgeButton badgeText="Button" onPress={onPress} />,
    );
    const button = getByTestId('badge-button');
    fireEvent.press(button);
    await expect(onPress).toHaveBeenCalled();
  });
});
