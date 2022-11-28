import { render, screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { Nav } from './index';

describe('Nav', () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl('/');
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
      'Market sandbox': '/market-sandbox',
    });
  });

  it('sets the active class for the active link', () => {
    render(<Nav activeClassName="active-class" />);

    expect(screen.getByText('Home')).toHaveClass('active-class');
    expect(screen.getByText('How it works')).not.toHaveClass('active-class');
  });

  it('uses a green logo', () => {
    render(<Nav />);

    expect(screen.getByTestId('logo')).toHaveStyle({ color: '#7DBB67' });
  });
});
