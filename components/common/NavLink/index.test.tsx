import { render, screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { NavLink } from './index';

describe('NavLink', () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl('/current-page');
  });

  it('renders the given link', () => {
    render(<NavLink href="/current-page">Click me</NavLink>);

    const link = screen.getByText('Click me');

    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', '/current-page');
  });

  it('marks a link as active', () => {
    render(
      <NavLink
        href="/current-page"
        activeClassName="active-class"
        inactiveClassName="inactive-class"
      >
        Click me
      </NavLink>,
    );

    const link = screen.getByText('Click me');

    expect(link).toHaveAttribute('aria-current', 'page');
    expect(link).toHaveClass('active-class');
    expect(link).not.toHaveClass('inactive-class');
  });

  it('marks an inactive link as inactive', () => {
    render(
      <NavLink
        href="/some-other-page"
        activeClassName="active-class"
        inactiveClassName="inactive-class"
      >
        Click me
      </NavLink>,
    );

    const link = screen.getByText('Click me');

    expect(link.getAttribute('aria-current')).toBeNull();
    expect(link).not.toHaveClass('active-class');
    expect(link).toHaveClass('inactive-class');
  });
});
