import { render, screen } from '@testing-library/react';
import { BiodiversityCount } from './index';

describe('BiodiversityCount', () => {
  it('renders the count', () => {
    render(
      <BiodiversityCount
        count={42}
        type="positive"
        boxStyle="buyer"
        accepted
        projectBid={1000}
      />,
    );

    expect(screen.getByTestId('product-count').textContent).toBe('42');
  });

  it('renders a count of zero if no count given', () => {
    render(
      <BiodiversityCount
        type="positive"
        boxStyle="buyer"
        accepted
        projectBid={1000}
      />,
    );

    expect(screen.getByTestId('product-count').textContent).toBe('0');
  });

  it('renders a count of zero', () => {
    render(
      <BiodiversityCount
        count={0}
        type="positive"
        boxStyle="buyer"
        accepted
        projectBid={1000}
      />,
    );

    expect(screen.getByTestId('product-count').textContent).toBe('0');
  });

  it('renders an adjusted count alongside the base count', () => {
    render(
      <BiodiversityCount
        adjustCount
        count={42}
        accepted={50}
        type="positive"
        boxStyle="buyer"
        projectBid={1000}
      />,
    );

    const productCounts = screen.getAllByTestId('product-count');

    expect(productCounts[0].textContent).toBe('21');
    expect(productCounts[1].textContent).toBe('42');
  });

  it('does not render the adjusted if the adjust count prop is not given', () => {
    render(
      <BiodiversityCount
        count={42}
        accepted={50}
        type="positive"
        boxStyle="buyer"
        projectBid={1000}
      />,
    );

    expect(screen.getByTestId('product-count').textContent).toBe('42');
  });

  it('does not render the adjusted count if showing loser styles', () => {
    render(
      <BiodiversityCount
        adjustCount
        showLoserStyles
        count={42}
        accepted={50}
        type="positive"
        boxStyle="buyer"
        projectBid={1000}
      />,
    );

    expect(screen.getByTestId('losing-product-count').textContent).toBe('42');
    expect(screen.queryByTestId('product-count')).not.toBeInTheDocument();
  });

  it('modifies the count when there is a cost per credit', () => {
    render(
      <BiodiversityCount
        type="positive"
        boxStyle="buyer"
        accepted
        count={42}
        projectBid={1000}
        costPerCredit={100}
      />,
    );

    expect(screen.getByTestId('product-count').textContent).toBe('4');
  });
});
