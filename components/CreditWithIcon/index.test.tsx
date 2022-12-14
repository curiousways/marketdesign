import { render, screen } from '@testing-library/react';
import { CreditWithIcon } from './index';

describe('CreditWithIcon', () => {
  it('renders the product count', () => {
    render(<CreditWithIcon count={42} Icon={<i />} />);

    expect(screen.getByTestId('credit').textContent).toBe('42');
  });

  it('renders the total price when a cost per credit is given', () => {
    render(<CreditWithIcon count={42} costPerCredit={10} Icon={<i />} />);

    expect(screen.getByTestId('credit').textContent).toBe('£420');
  });
});
