import { render, screen } from '@testing-library/react';
import { NutrientCount } from './index';

describe('NutrientCount', () => {
  it('renders the count', () => {
    render(
      <NutrientCount count={42} type="positive" boxStyle="buyer" accepted />,
    );

    expect(screen.getByTestId('product-count').textContent).toBe('42');
  });

  it('renders a count of zero if no count given', () => {
    render(<NutrientCount type="positive" boxStyle="buyer" accepted />);

    expect(screen.getByTestId('product-count').textContent).toBe('0');
  });

  it('renders a count of zero', () => {
    render(
      <NutrientCount count={0} type="positive" boxStyle="buyer" accepted />,
    );

    expect(screen.getByTestId('product-count').textContent).toBe('0');
  });

  it('renders an adjusted count alongside the base count', () => {
    render(
      <NutrientCount
        adjustCount
        count={42}
        accepted={50}
        type="positive"
        boxStyle="buyer"
      />,
    );

    const productCounts = screen.getAllByTestId('product-count');

    expect(productCounts[0].textContent).toBe('21');
    expect(productCounts[1].textContent).toBe('42');
  });

  it('does not render the adjusted if the adjust count prop is not given', () => {
    render(
      <NutrientCount
        count={42}
        accepted={50}
        boxStyle="buyer"
        type="positive"
      />,
    );

    expect(screen.getByTestId('product-count').textContent).toBe('42');
  });

  it('does not render the adjusted count if showing loser styles', () => {
    render(
      <NutrientCount
        adjustCount
        showLoserStyles
        count={42}
        accepted={50}
        type="positive"
        boxStyle="buyer"
      />,
    );

    expect(screen.getByTestId('losing-product-count').textContent).toBe('42');
    expect(screen.queryByTestId('product-count')).not.toBeInTheDocument();
  });
});
