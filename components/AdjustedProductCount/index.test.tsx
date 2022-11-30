import { render, screen } from '@testing-library/react';
import { AdjustedProductCount } from './index';

describe('AdjustedProductCount', () => {
  it('renders the base product count', () => {
    render(<AdjustedProductCount count={42} accepted />);

    expect(screen.getByTestId('product-count').textContent).toBe('42');
  });

  it('renders an adjusted count alongside the base count', () => {
    render(<AdjustedProductCount count={42} accepted={50} />);

    const productCounts = screen.getAllByTestId('product-count');

    expect(productCounts[0].textContent).toBe('21');
    expect(productCounts[1].textContent).toBe('42');
  });
});
