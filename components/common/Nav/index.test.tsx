import React from 'react';
import { render, screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { Nav } from './index';

describe('Nav', () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl('/current-page');
  });

  it('includes all the expected links', () => {
    render(<Nav />);

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
});
