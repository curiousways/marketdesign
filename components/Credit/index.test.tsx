import { render, screen } from '@testing-library/react';
import { Credit } from './index';

describe('Credit', () => {
  it('renders the product count', () => {
    render(<Credit count={42} Icon={<i />} />);

    expect(screen.getByTestId('product-count').textContent).toBe('42');
  });

  it('renders the total price when a cost per credit is given', () => {
    render(<Credit count={42} costPerCredit={10} Icon={<i />} />);

    expect(screen.getByTestId('product-count').textContent).toBe('£420');
  });
});
