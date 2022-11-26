import React from 'react';
import { render, screen } from '@testing-library/react';
import { MarketOutcome } from './index';

describe('MarketOutcome', () => {
  it('renders the total bids, offers and surplus', () => {
    const getProjectCost = jest.fn(({ cost }) => cost);

    render(
      <MarketOutcome
        getProjectCost={getProjectCost}
        buyerProjects={[
          {
            title: 'Buyer 1',
            cost: 10000,
            products: { biodiversity: 1, nutrients: 2 },
          },
          {
            title: 'Buyer 2',
            cost: 18000,
            products: { biodiversity: 2, nutrients: 2 },
          },
        ]}
        sellerProjects={[
          {
            title: 'Seller 1',
            cost: 5000,
            products: { biodiversity: 1, nutrients: 2 },
          },
          {
            title: 'Seller 2',
            cost: 10000,
            products: { biodiversity: 2, nutrients: 2 },
          },
        ]}
      />,
    );

    expect(screen.getByTestId('total-bids')).toHaveTextContent('£28,000');
    expect(screen.getByTestId('total-offers')).toHaveTextContent('£15,000');
    expect(screen.getByTestId('surplus')).toHaveTextContent('£13,000');
  });

  it('does not render the balance if the market is not solved', () => {
    render(
      <MarketOutcome
        getProjectCost={jest.fn()}
        buyerProjects={[]}
        sellerProjects={[]}
      />,
    );

    expect(screen.queryByTestId('balance')).not.toBeInTheDocument();
  });

  it('renders the balance if the market is solved', () => {
    render(
      <MarketOutcome
        isMarketSolved
        getProjectCost={jest.fn()}
        buyerProjects={[]}
        sellerProjects={[]}
      />,
    );

    expect(screen.getByTestId('balance')).toBeInTheDocument();
  });
});
