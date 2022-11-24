import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import clonedeep from 'lodash.clonedeep';

import { fadeInDown } from '@/utils/animations';
import { Bid, Bidder, Data, Role, MarketData } from '@/types/demo';

import LoadingOverlay from './LoadingOverlay';
import ParticipantsList from './ParticipantsList';
import MarketOutcome from './MarketOutcome';
import { Map } from "@/components/map/Map"

type Props = {
  bidders: Bidder[];
  result: Data | undefined;
  loading: boolean;
  role: Role;
  roleId: string;
  market: MarketData;
  setRole: Dispatch<SetStateAction<Role>>;
  setRoleId: Dispatch<SetStateAction<string>>;
  updateBidders: Dispatch<SetStateAction<Bidder[]>>;
};

const MainContent = ({
  bidders,
  result,
  loading,
  role,
  roleId,
  market,
  setRole,
  setRoleId, updateBidders}: Props) => {
  const [winners, setWinners] = useState<Bidder[] | undefined>([]);
  const [losers, setLosers] = useState<Bidder[] | undefined>([]);

  //  const filteredBidders = bidders.filter((bidder) => bidder.name !== roleId);

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
    const filteredBidders = market.states[0].bidders.filter(
      (bidder) => bidder.name !== roleId,
    );
   updateBidders(filteredBidders);
  }, [role, roleId])

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
    <div className="border-l border-green-dark pt-4 pb-24 w-full relative">
      {/* Loading Screen */}
      {loading && <LoadingOverlay />}

      {role && (
        <div className="flex justify-center">
          {/* Losers */}
          {payments && (
            <motion.div
              variants={fadeInDown}
              initial="hidden"
              animate="visible"
            >
              <ParticipantsList
                payments={payments}
                participants={losers}
                surplusShares={surplusShares}
                type="losers"
              />
            </motion.div>
          )}

          {/* Original list and winners */}
          <div className="space-y-5">
            {/* Participants list */}
            <motion.div
              variants={fadeInDown}
              initial="hidden"
              animate="visible"
            >
              <ParticipantsList
                participants={!payments ? bidders : winners}
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
        </div>
      )}

      {!role && (
        <div className="cursor-pointer">
          <div className="flex gap-x-3">
            <p
              className="cursor-pointer text-xl"
              onClick={() =>{
                setRole('Seller')
                setRoleId("seller 1")
              }}
            >
              Seller 1
            </p>
            <p
              className="cursor-pointer text-xl"
              onClick={() => {
                setRole('Buyer')
                setRoleId('buyer 1');
              }}
            >
              Buyer 1
            </p>
          </div>
          <Map />
        </div>
      )}
    </div>
  );
};

export default MainContent;
