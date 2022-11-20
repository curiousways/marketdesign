import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import { fadeIn } from "@/utils/animations";
import Description from "./Description";
import Details from "./Details";
import Navigation from "./Navigation";
import { useWalkthroughContext } from "@/context/WalkthroughContext";
import { WalkthroughMarketState } from "@/types/walkthrough";

const SideBar = () => {
  const {
    scenario,
    stage,
    marketState,
    goToNextMarketState,
  } = useWalkthroughContext();

  const showSolveMarketBtn = (
    marketState === WalkthroughMarketState.solvable
  );

  const onSolveMarketClick = (e: React.FormEvent) => {
    e.preventDefault();
    goToNextMarketState();
  };

  return (
    <div className="w-1/3 max-w-[434px] py-4 px-5">
      <AnimatePresence>
        <div
          key="sidebar-animation"
          className="gap-y-6 flex flex-col items-center"
        >
          {/* Top */}
          {scenario.options.showDetailsWidget && (
            <Details />
          )}

          {/* Solve Market Button */}
          {showSolveMarketBtn && (
            <motion.button
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              exit="hidden"
              layout
              // onAnimationComplete={() => !isPresent && safeToRemove()}
              onClick={onSolveMarketClick}
              className="text-center border-2 border-black rounded-lg p-3 text-black text-xl hover:bg-black hover:text-white duration-300 animate-scale"
            >
              Solve Market
            </motion.button>
          )}

          {/* Navigation with next and previous buttons */}
          <Navigation />

          {/* Walkthrough Description text */}
          <Description />
        </div>
      </AnimatePresence>
    </div>
  );
};

export default SideBar;
