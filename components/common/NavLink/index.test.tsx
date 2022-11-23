import React from 'react';
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

  it('marks an active link as aria-current', () => {
    render(<NavLink href="/current-page">Click me</NavLink>);

    const link = screen.getByText('Click me');

    expect(link).toHaveAttribute('aria-current', 'page');
  });

  it('does not mark an inactive link as aria-current', () => {
    render(<NavLink href="/some-other-page">Click me</NavLink>);

    const link = screen.getByText('Click me');

    expect(link.getAttribute('aria-current')).toBeNull();
  });
});
