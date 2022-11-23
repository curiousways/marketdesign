import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import clonedeep from 'lodash.clonedeep';

import { fadeInDown } from '@/utils/animations';
import { Bid, Bidder, Data } from '@/types/demo';

import LoadingOverlay from './LoadingOverlay';
import ParticipantsList from './ParticipantsList';
import MarketOutcome from './MarketOutcome';

type Props = { bidders: Bidder[]; result: Data | undefined; loading: boolean };

const MainContent = ({ bidders, result, loading }: Props) => {
  const [winners, setWinners] = useState<Bidder[] | undefined>([]);
  const [losers, setLosers] = useState<Bidder[] | undefined>([]);

  // Returns array of sellers and buyers
  const sellers = bidders.filter((bidder) => bidder.bids[0]?.v < 0);
  const buyers = bidders.filter((bidder) => bidder.bids[0]?.v > 0);

  const marketSurplus = result?.surplus;
  const payments = result?.payments;
  const surplusShares = result?.surplus_shares;

  // Calculate total bids for all buyers
  const getTotalBids = () => {
    let totalBids = 0;

    buyers.forEach((buyer) => {
      buyer.bids.forEach((bid) => {
        totalBids += Math.abs(bid.v);
      });
    });

    return totalBids;
  };

  // Calculate total offers for all sellers
  const getTotalOffers = () => {
    let totalOffers = 0;

    sellers.forEach((seller) => {
      seller.bids.forEach((bid) => {
        totalOffers += Math.abs(bid.v);
      });
    });

    return totalOffers;
  };

  const checkForWinningBids = (bidder: Bidder) => {
    const winningBids: Bid[] = [];

    bidder.bids.forEach((bid) => {
      if (bid.winning && bid.winning === 1.0) {
        winningBids.push(bid);
      }
    });

    bidder.bids = winningBids;

    return bidder;
  };

  const checkForLosingBids = (bidder: Bidder) => {
    const losingBids: Bid[] = [];

    bidder.bids.forEach((bid) => {
      if (bid.winning === 0) {
        losingBids.push(bid);
      }
    });

    bidder.bids = losingBids;

    return bidder;
  };

  useEffect(() => {
    const winnersList =
      payments &&
      clonedeep(bidders).map((bidder: Bidder) => checkForWinningBids(bidder));

    const losersList =
      payments &&
      clonedeep(bidders).map((bidder: Bidder) => checkForLosingBids(bidder));

    setWinners(winnersList);
    setLosers(losersList);
  }, [bidders, payments]);

  return (
    <div className="border-l border-green-dark pt-4 pb-24 w-full relative flex justify-center">
      {/* Loading Screen */}
      {loading && <LoadingOverlay />}

      {/* Losers */}
      {payments && (
        <motion.div variants={fadeInDown} initial="hidden" animate="visible">
          <ParticipantsList
            payments={payments}
            participants={losers}
            surplusShares={surplusShares}
            type="losers"
          />
        </motion.div>
      )}

      <div className="space-y-5">
        {/* Participants list */}
        <motion.div variants={fadeInDown} initial="hidden" animate="visible">
          <ParticipantsList
            participants={!payments ? [...sellers, ...buyers] : winners}
            payments={payments}
            surplusShares={surplusShares}
          />
        </motion.div>

        {/* Market Outcome */}
        {payments && (
          <MarketOutcome
            marketSurplus={marketSurplus}
            totalBids={getTotalBids()}
            totalOffers={getTotalOffers()}
          />
        )}
      </div>

      {false && <p className="text-4xl">MAP</p>}
    </div>
  );
};

export default MainContent;
