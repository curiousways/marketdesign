import { render, screen } from '@testing-library/react';
import { ProductCount } from './index';

describe('ProductCount', () => {
  it('renders the product count', () => {
    render(<ProductCount>42</ProductCount>);

    expect(screen.getByTestId('product-count').textContent).toBe('42');
  });
});
