import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { fadeIn } from '@/utils/animations';
import { Bidder, Role } from '@/types/demo';

import Description from './Description';
import Details from './Details';
import Navigation from './Navigation';

type Props = {
  bidders: Bidder[];
  solveMarket: () => void;
  updateBidders: Dispatch<SetStateAction<Bidder[]>>;
  role: Role;
  roleId: string;
};

const SideBar = ({
  solveMarket,
  updateBidders,
  bidders,
  role,
  roleId,
}: Props) => {
  const [price, setPrice] = useState('');
  const [showSolveBtn, setShowSolveBtn] = useState(false);
  const [player, setPlayer] = useState<Bidder>();

  useEffect(() => {
    const me = bidders.find((bidder) => bidder.name === roleId);
    setPlayer(me);
  }, [role, roleId]);

  const onSolveMarketBtnClick = () => {
    solveMarket();
    setTimeout(() => {
      setShowSolveBtn(false);
    }, 300);
  };

  const onSubmit = () => {
    const newBid = player as Bidder;

    if (price !== '') {
      if (role === 'Buyer') {
        newBid.bids[0].v = Number(price);
      } else {
        newBid.bids[0].v = -Number(price);
      }
    }

    updateBidders((prev) => [newBid, ...prev]);
    setShowSolveBtn(true);
  };

  return (
    <div className="max-w-[434px] py-4 px-5 flex flex-col gap-y-8 items-center">
      <AnimatePresence>
        {/* Top */}
        {role !== undefined && (
          <Details
            key={1}
            price={price}
            setPrice={setPrice}
            onSubmit={onSubmit}
            role={role}
            player={player}
          />
        )}

        {/* Solve Market Button */}
        {showSolveBtn && (
          <motion.button
            key={2}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
            layout
            // onAnimationComplete={() => !isPresent && safeToRemove()}
            onClick={onSolveMarketBtnClick}
            className="text-center border-2 border-black rounded-lg p-3 text-black text-xl hover:bg-black hover:text-white duration-300"
          >
            Solve Market
          </motion.button>
        )}

        {/* Navigation with next and previous buttons */}
        <Navigation key={3} next={() => 'next'} previous={() => 'previous'} />

        {/* Walkthrough Description text */}
        <Description key={4}>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Repudiandae officiis ex ipsum eius veritatis cumque omnis,
            cupiditate quia. Ullam consectetur reiciendis ipsa ex error sed
            fugit blanditiis minus optio enim.
          </p>
        </Description>
      </AnimatePresence>
    </div>
  );
};

export default SideBar;
