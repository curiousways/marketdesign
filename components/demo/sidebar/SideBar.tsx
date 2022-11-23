import React, { Dispatch, SetStateAction, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { fadeIn } from '@/utils/animations';
import { Bidder } from '@/types/demo';

import Description from './Description';
import Details from './Details';
import Navigation from './Navigation';

type Props = {
  solveMarket: () => void;
  updateBidders: Dispatch<SetStateAction<Bidder[]>>;
};

const SideBar = ({ solveMarket, updateBidders }: Props) => {
  const [price, setPrice] = useState('');
  const [showSolveBtn, setShowSolveBtn] = useState(false);

  const onSolveMarketBtnClick = () => {
    solveMarket();
    setTimeout(() => {
      setShowSolveBtn(false);
    }, 300);
  };

  const onSubmit = () => {
    const newBid = {
      name: 'My Project',
      bids: [
        {
          v: -Number(price),
          q: {
            biodiversity: 2,
            nutrients: 2,
          },
          divisibility: 0,
        },
      ],
    };
    updateBidders((prev) => [newBid, ...prev]);
    setShowSolveBtn(true);
  };

  return (
    <div className="max-w-[434px] py-4 px-5 flex flex-col gap-y-8 items-center">
      <AnimatePresence>
        {/* Top */}
        {true && (
          <Details
            key={1}
            price={price}
            setPrice={setPrice}
            onSubmit={onSubmit}
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
