import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { fadeIn } from '@/utils/animations';
import { useWalkthroughContext } from '@/context/WalkthroughContext';
import { WalkthroughMarketState } from '@/types/walkthrough';
import Details from './Details';
import { Pagination } from '../../common/Pagination';
import { parseScenarioId } from '../../../utils/walkthroughs';
import { DescriptionBox } from '../../common/DescriptionBox';

const SideBar = () => {
  const {
    stage,
    scenario,
    scenarioId,
    marketState,
    goToNextMarketState,
    walkthrough,
    hasPreviousStage,
    hasNextStage,
    goToPreviousStage,
    goToNextStage,
  } = useWalkthroughContext();

  const showSolveMarketBtn = marketState === WalkthroughMarketState.solvable;
  const { walkthroughIndex } = parseScenarioId(scenarioId);

  const onSolveMarketClick = (e: React.FormEvent) => {
    e.preventDefault();
    goToNextMarketState();
  };

  return (
    <div className="w-1/3 max-w-[434px] py-4 px-5">
      <AnimatePresence>
        <div
          key="sidebar-animation"
          className="gap-y-4 flex flex-col items-center"
        >
          {/* Top */}
          {scenario.options.showDetailsWidget && <Details />}

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
              className="text-center border-2 border-black rounded-lg p-3 text-black text-l hover:bg-black hover:text-white duration-300 animate-scale"
            >
              Solve Market
            </motion.button>
          )}

          {/* Navigation with next and previous buttons */}
          <Pagination
            title={walkthrough.title}
            subtitle={`WALKTHROUGH ${walkthroughIndex + 1}`}
            hasNextPage={hasNextStage}
            hasPreviousPage={hasPreviousStage}
            onNextClick={goToNextStage}
            onPreviousClick={goToPreviousStage}
          />

          {/* Walkthrough Description text */}
          <DescriptionBox>{scenario.sidebarContent?.[stage]}</DescriptionBox>
        </div>
      </AnimatePresence>
    </div>
  );
};

export default SideBar;
