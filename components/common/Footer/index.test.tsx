import React from 'react';
import { render, screen } from '@testing-library/react';
import { Footer } from './index';

describe('Footer', () => {
  it('includes all the expected links', () => {
    render(<Footer />);

    const links = screen.getAllByRole('link').reduce(
      (acc, link) => ({
        ...acc,
        [String(link.textContent || link.getAttribute('aria-label'))]:
          link.getAttribute('href'),
      }),
      {},
    );

    expect(links).toEqual({
      'Exeter Lindsay': '/',
      Home: '/',
      'About the model': '/about-the-model',
      'How it works': '/how-it-works',
      'Live demo': '/live-demo',
    });
  });

  it('uses a white logo', () => {
    render(<Footer />);

    expect(screen.getByTestId('logo')).toHaveStyle({ color: 'white' });
  });
});
