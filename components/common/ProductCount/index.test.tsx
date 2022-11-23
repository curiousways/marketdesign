import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProductCount } from './index';

describe('ProductCount', () => {
  it('renders the product count', () => {
    render(<ProductCount productCount={42} Icon={<i />} />);

    expect(screen.getByTestId('product-count').textContent).toBe('42');
  });

  it('renders the total price when a cost per credit is given', () => {
    render(<ProductCount productCount={42} costPerCredit={10} Icon={<i />} />);

    expect(screen.getByTestId('product-count').textContent).toBe('£420');
  });
});
