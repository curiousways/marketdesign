import { ReactNode } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MarketOutcome } from './index';
import { ProjectsContext } from '../../context/ProjectsContext';

type WrapperProps = { children: ReactNode };

const wrapper = ({ children }: WrapperProps) => (
  <ProjectsContext.Provider
    value={{
      setProjectCost: jest.fn(),
      getProjectCost: jest.fn(),
      getAcceptedProjectCost: jest.fn(({ cost }) =>
        Array.isArray(cost) ? cost[0] : cost,
      ),
      setIsProjectDivisible: jest.fn(),
      isProjectDivisible: () => false,
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

  it('does not show the balance if the market is not solved', () => {
    render(<MarketOutcome buyerProjects={[]} sellerProjects={[]} />, {
      wrapper,
    });

    expect(screen.getByTestId('balance-container')).toHaveStyle({ opacity: 0 });
  });

  it('shows the balance if the market is solved', async () => {
    render(
      <MarketOutcome isMarketSolved buyerProjects={[]} sellerProjects={[]} />,
      { wrapper },
    );

    await waitFor(() =>
      expect(screen.getByTestId('balance-container')).toHaveStyle({
        opacity: 1,
      }),
    );
  });
});
