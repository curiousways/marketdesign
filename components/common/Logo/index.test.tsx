import React from 'react';
import { render, screen } from '@testing-library/react';
import { Logo } from './index';

describe('Logo', () => {
  it('renders the SVG with the default color', () => {
    render(<Logo />);

    expect(screen.getByTestId('logo')).toHaveStyle({ color: '#7DBB67' });
  });

  it('renders the SVG with a custom color', () => {
    render(<Logo color="white" />);

    expect(screen.getByTestId('logo')).toHaveStyle({ color: 'white' });
  });
});
