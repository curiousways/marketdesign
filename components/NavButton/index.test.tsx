import { render, screen } from '@testing-library/react';
import { NavButton } from './index';

describe('NavButton', () => {
  it('renders the given link', () => {
    render(<NavButton link="/current-page" text="Click me" />);

    const link = screen.getByRole('link');

    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', '/current-page');
  });
});
