import { screen, within } from '@testing-library/react';

const getMarketParticipant = (element: HTMLElement) => ({
  title: within(element).getByTestId('market-participant-title'),
  bidOrOffer: within(element).queryByTestId('bid-or-offer'),
  discountOrBonus: within(element).queryByTestId('discount-or-bonus'),
  paysOrReceived: within(element).queryByTestId('pays-or-received'),
});

export const getMarketParticipants = () => {
  const buyers = screen
    .queryAllByTestId('buyer-participant')
    .map(getMarketParticipant);

  const losingBuyers = screen
    .queryAllByTestId('losing-buyer-participant')
    .map(getMarketParticipant);

  const sellers = screen
    .queryAllByTestId('seller-participant')
    .map(getMarketParticipant);

  const losingSellers = screen
    .queryAllByTestId('losing-seller-participant')
    .map(getMarketParticipant);

  return {
    buyers,
    losingBuyers,
    sellers,
    losingSellers,
    allParticipants: [...buyers, ...sellers, ...losingBuyers, ...losingSellers],
  };
};
