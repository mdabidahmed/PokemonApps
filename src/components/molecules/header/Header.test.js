import React from 'react';
import HeaderComponent from './Header';

import renderer from 'react-test-renderer';

describe('HeaderComponent', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<HeaderComponent description="Test description" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
