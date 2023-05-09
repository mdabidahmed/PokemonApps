import React from 'react';
import Loader from './Loader';

import {render} from '@testing-library/react-native';

describe('<Loader />', () => {
  test('should render the loader', () => {
    const {getByTestId} = render(<Loader />);
    const loader = getByTestId('loader');
    expect(loader).toBeTruthy();
  });
});
