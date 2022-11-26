import React, { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { MarketOutcome } from './index';
import { ProjectsContext } from '../../../context/ProjectsContext';

type WrapperProps = { children: ReactNode };

const wrapper = ({ children }: WrapperProps) => (
  <ProjectsContext.Provider
    value={{
      setProjectCost: jest.fn(),
      getProjectCost: jest.fn(({ cost }) =>
        Array.isArray(cost) ? cost[0] : cost,
      ),
    }}
  >
    {children}
  </ProjectsContext.Provider>
);

describe('MarketOutcome', () => {
  it('renders the total bids, offers and surplus', () => {
    render(
      <MarketOutcome
        buyerProjects={[
          {
            title: 'Buyer 1',
            cost: 10000,
            products: { biodiversity: 1, nutrients: 2 },
            accepted: () => true,
            discountOrBonus: 0,
          },
          {
            title: 'Buyer 2',
            cost: 18000,
            products: { biodiversity: 2, nutrients: 2 },
            accepted: () => true,
            discountOrBonus: 0,
          },
        ]}
        sellerProjects={[
          {
            title: 'Seller 1',
            cost: 5000,
            products: { biodiversity: 1, nutrients: 2 },
            accepted: () => true,
            discountOrBonus: 0,
          },
          {
            title: 'Seller 2',
            cost: 10000,
            products: { biodiversity: 2, nutrients: 2 },
            accepted: () => true,
            discountOrBonus: 0,
          },
        ]}
      />,
      { wrapper },
    );

    expect(screen.getByTestId('total-bids')).toHaveTextContent('£28,000');
    expect(screen.getByTestId('total-offers')).toHaveTextContent('£15,000');
    expect(screen.getByTestId('surplus')).toHaveTextContent('£13,000');
  });

  it('does not render the balance if the market is not solved', () => {
    render(<MarketOutcome buyerProjects={[]} sellerProjects={[]} />, {
      wrapper,
    });

    expect(screen.queryByTestId('balance')).not.toBeInTheDocument();
  });

  it('renders the balance if the market is solved', () => {
    render(
      <MarketOutcome isMarketSolved buyerProjects={[]} sellerProjects={[]} />,
      { wrapper },
    );

    expect(screen.getByTestId('balance')).toBeInTheDocument();
  });
});
