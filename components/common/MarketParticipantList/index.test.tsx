import { ReactNode } from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import { MarketParticipantList } from './index';
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

const buyerProjects = [
  {
    title: 'Buyer 1',
    cost: 10000,
    products: { biodiversity: 1, nutrients: 2 },
    accepted: () => true,
    discountOrBonus: 5000,
  },
  {
    title: 'Buyer 2',
    cost: 18000,
    products: { biodiversity: 2, nutrients: 2 },
    accepted: () => false,
    discountOrBonus: 0,
  },
];

const sellerProjects = [
  {
    title: 'Seller 1',
    cost: 5000,
    products: { biodiversity: 1, nutrients: 2 },
    accepted: () => true,
    discountOrBonus: 2000,
  },
  {
    title: 'Seller 2',
    cost: 10000,
    products: { biodiversity: 2, nutrients: 2 },
    accepted: () => false,
    discountOrBonus: 0,
  },
];

const getMarketParticipant = (element: HTMLElement) => ({
  title: within(element).getByTestId('market-participant-title'),
  bidOrOffer: within(element).queryByTestId('bid-or-offer'),
  discountOrBonus: within(element).queryByTestId('discount-or-bonus'),
  paysOrReceived: within(element).queryByTestId('pays-or-received'),
});

const getMarketParticipants = () => ({
  buyers: screen
    .queryAllByTestId('buyer-participant')
    .map(getMarketParticipant),
  losingBuyers: screen
    .queryAllByTestId('losing-buyer-participant')
    .map(getMarketParticipant),
  sellers: screen
    .queryAllByTestId('seller-participant')
    .map(getMarketParticipant),
  losingSellers: screen
    .queryAllByTestId('losing-seller-participant')
    .map(getMarketParticipant),
});

describe('MarketOutcome', () => {
  it('renders some buyer and seller participants with all of the expected costs', () => {
    render(
      <MarketParticipantList
        myProjects={[]}
        losingProjects={[]}
        buyerProjects={buyerProjects}
        sellerProjects={sellerProjects}
      />,
      { wrapper },
    );

    const { buyers, sellers } = getMarketParticipants();

    expect(buyers).toHaveLength(2);
    expect(sellers).toHaveLength(2);

    expect(buyers[0].title).toHaveTextContent('Buyer 1');
    expect(buyers[0].bidOrOffer).toHaveTextContent('£10,000');
    expect(buyers[0].discountOrBonus).toHaveTextContent('£5,000');
    expect(buyers[0].paysOrReceived).toHaveTextContent('£5,000');

    expect(buyers[1].title).toHaveTextContent('Buyer 2');
    expect(buyers[1].bidOrOffer).toHaveTextContent('£18,000');
    expect(buyers[1].discountOrBonus).toHaveTextContent('£0');
    expect(buyers[1].paysOrReceived).toHaveTextContent('£18,000');

    expect(sellers[0].title).toHaveTextContent('Seller 1');
    expect(sellers[0].bidOrOffer).toHaveTextContent('£5,000');
    expect(sellers[0].discountOrBonus).toHaveTextContent('£2,000');
    expect(sellers[0].paysOrReceived).toHaveTextContent('£7,000');

    expect(sellers[1].title).toHaveTextContent('Seller 2');
    expect(sellers[1].bidOrOffer).toHaveTextContent('£10,000');
    expect(sellers[1].discountOrBonus).toHaveTextContent('£0');
    expect(sellers[1].paysOrReceived).toHaveTextContent('£10,000');
  });

  it('hides all of the costs by default', () => {
    render(
      <MarketParticipantList
        myProjects={[]}
        losingProjects={[]}
        buyerProjects={[buyerProjects[0]]}
        sellerProjects={[sellerProjects[0]]}
      />,
      { wrapper },
    );

    const { buyers, sellers } = getMarketParticipants();

    expect(buyers[0].bidOrOffer).toHaveStyle({ opacity: 0 });
    expect(buyers[0].discountOrBonus).toHaveStyle({ opacity: 0 });
    expect(buyers[0].paysOrReceived).toHaveStyle({ opacity: 0 });

    expect(sellers[0].bidOrOffer).toHaveStyle({ opacity: 0 });
    expect(sellers[0].discountOrBonus).toHaveStyle({ opacity: 0 });
    expect(sellers[0].paysOrReceived).toHaveStyle({ opacity: 0 });
  });

  it('shows the bid or offer for my projects only before all costs are shown', async () => {
    render(
      <MarketParticipantList
        myProjects={[buyerProjects[0]]}
        losingProjects={[]}
        buyerProjects={[buyerProjects[0]]}
        sellerProjects={[sellerProjects[0]]}
      />,
      { wrapper },
    );

    const { buyers, sellers } = getMarketParticipants();

    await waitFor(() =>
      expect(buyers[0].bidOrOffer).toHaveStyle({ opacity: 1 }),
    );

    expect(buyers[0].discountOrBonus).toHaveStyle({ opacity: 0 });
    expect(buyers[0].paysOrReceived).toHaveStyle({ opacity: 0 });

    expect(sellers[0].bidOrOffer).toHaveStyle({ opacity: 0 });
    expect(sellers[0].discountOrBonus).toHaveStyle({ opacity: 0 });
    expect(sellers[0].paysOrReceived).toHaveStyle({ opacity: 0 });
  });

  it('shows the bid or offer for all projects when the showCosts prop is given', async () => {
    render(
      <MarketParticipantList
        showCosts
        myProjects={[]}
        losingProjects={[]}
        buyerProjects={[buyerProjects[0]]}
        sellerProjects={[sellerProjects[0]]}
      />,
      { wrapper },
    );

    const { buyers, sellers } = getMarketParticipants();

    await waitFor(() =>
      expect(buyers[0].bidOrOffer).toHaveStyle({ opacity: 1 }),
    );

    await waitFor(() =>
      expect(sellers[0].bidOrOffer).toHaveStyle({ opacity: 1 }),
    );

    expect(buyers[0].discountOrBonus).toHaveStyle({ opacity: 0 });
    expect(buyers[0].paysOrReceived).toHaveStyle({ opacity: 0 });

    expect(sellers[0].discountOrBonus).toHaveStyle({ opacity: 0 });
    expect(sellers[0].paysOrReceived).toHaveStyle({ opacity: 0 });
  });

  it('shows the discount or bonus when the showSurpluses prop is given', async () => {
    render(
      <MarketParticipantList
        showCosts
        showSurpluses
        myProjects={[]}
        losingProjects={[]}
        buyerProjects={[buyerProjects[0]]}
        sellerProjects={[sellerProjects[0]]}
      />,
      { wrapper },
    );

    const { buyers, sellers } = getMarketParticipants();

    await waitFor(() =>
      expect(buyers[0].bidOrOffer).toHaveStyle({ opacity: 1 }),
    );

    await waitFor(() =>
      expect(sellers[0].bidOrOffer).toHaveStyle({ opacity: 1 }),
    );

    expect(buyers[0].discountOrBonus).toHaveStyle({ opacity: 1 });
    expect(buyers[0].paysOrReceived).toHaveStyle({ opacity: 0 });

    expect(sellers[0].discountOrBonus).toHaveStyle({ opacity: 1 });
    expect(sellers[0].paysOrReceived).toHaveStyle({ opacity: 0 });
  });

  it('shows the pays or received when the market is solved', async () => {
    render(
      <MarketParticipantList
        showCosts
        showSurpluses
        isMarketSolved
        myProjects={[]}
        losingProjects={[]}
        buyerProjects={[buyerProjects[0]]}
        sellerProjects={[sellerProjects[0]]}
      />,
      { wrapper },
    );

    const { buyers, sellers } = getMarketParticipants();

    await waitFor(() =>
      expect(buyers[0].bidOrOffer).toHaveStyle({ opacity: 1 }),
    );

    await waitFor(() =>
      expect(sellers[0].bidOrOffer).toHaveStyle({ opacity: 1 }),
    );

    expect(buyers[0].discountOrBonus).toHaveStyle({ opacity: 1 });
    expect(buyers[0].paysOrReceived).toHaveStyle({ opacity: 1 });

    expect(sellers[0].discountOrBonus).toHaveStyle({ opacity: 1 });
    expect(sellers[0].paysOrReceived).toHaveStyle({ opacity: 1 });
  });

  it('separates the losing projects and hides the costs', async () => {
    render(
      <MarketParticipantList
        showCosts
        showSurpluses
        isMarketSolved
        showWinners
        myProjects={[]}
        losingProjects={[buyerProjects[1], sellerProjects[1]]}
        buyerProjects={buyerProjects}
        sellerProjects={sellerProjects}
      />,
      { wrapper },
    );

    const { buyers, losingBuyers, sellers, losingSellers } =
      getMarketParticipants();

    expect(buyers).toHaveLength(1);
    expect(sellers).toHaveLength(1);

    expect(losingBuyers).toHaveLength(1);
    expect(losingSellers).toHaveLength(1);

    expect(losingBuyers[0].title).toHaveTextContent('Buyer 2');
    expect(losingBuyers[0].bidOrOffer).toBeNull();
    expect(losingBuyers[0].discountOrBonus).toBeNull();
    expect(losingBuyers[0].paysOrReceived).toBeNull();

    expect(losingSellers[0].title).toHaveTextContent('Seller 2');
    expect(losingSellers[0].bidOrOffer).toBeNull();
    expect(losingSellers[0].discountOrBonus).toBeNull();
    expect(losingSellers[0].paysOrReceived).toBeNull();
  });
});