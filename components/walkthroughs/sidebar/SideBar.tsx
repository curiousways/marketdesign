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
    && stage > scenario.options.allow_button_click
  );

  const onSolveMarketClick = (e: React.FormEvent) => {
    e.preventDefault();
    goToNextMarketState();
  };

  return (
    <div className="max-w-[434px] py-4 px-5">
      <AnimatePresence>
        <div
          key="sidebar-animation"
          className="gap-y-6 flex flex-col items-center"
        >
          {/* Top */}
          {stage >= scenario.options.show_details_widget && (
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
              className="text-center border-2 border-black rounded-lg p-3 text-black text-xl hover:bg-black hover:text-white duration-300"
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
