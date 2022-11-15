import React, { Dispatch, ReactNode, SetStateAction } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { fadeIn } from "@/utils/animations";
import { WalkthroughData } from "@/types/walkthrough";

import Description from "./Description";
import Details from "./Details";
import Navigation from "./Navigation";

type Props = {
  scenarioId: string;
  stage: number;
  setStage: Dispatch<SetStateAction<number>>;
  data: WalkthroughData;
  sidebarContent: ReactNode;
};

const SideBar = ({
  scenarioId,
  stage,
  setStage,
  data,
  sidebarContent,
}: Props) => {
  const maxStage = data.options.stages;
  const showSolveMarketBtn = data.options.show_solve_market;
  const { show_details_widget } = data.options;

  const previous = () => {
    if (stage > 1) setStage((prev) => prev - 1);
  };

  const next = () => {
    if (maxStage && stage < maxStage) setStage((prev) => prev + 1);
  };

  // const nextWalkthrough = () => {
  //   setWalkthrough(data.options.next_walkthrough);
  // };

  const onButtonClick = (e: React.FormEvent) => {
    e.preventDefault();
    next();
  };

  return (
    <div className="max-w-[434px] py-4 px-5 flex flex-col gap-y-8 items-center">
      <AnimatePresence>
        {/* Top */}
        {show_details_widget && stage >= show_details_widget && (
          <Details key={1} next={next} data={data} stage={stage} />
        )}

        {/* Solve Market Button */}
        {stage === showSolveMarketBtn && (
          <motion.button
            key={2}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
            layout
            // onAnimationComplete={() => !isPresent && safeToRemove()}
            onClick={onButtonClick}
            className="text-center border-2 border-black rounded-lg p-3 text-black text-xl hover:bg-black hover:text-white duration-300"
          >
            Solve Market
          </motion.button>
        )}

        {/* Navigation with next and previous buttons */}
        <Navigation
          key={3}
          scenarioId={scenarioId}
          stage={stage}
          next={next}
          previous={previous}
          data={data}
        />

        {/* Walkthrough Description text */}
        <Description
          key={4}
          // walkthrough={walkthrough}
          stage={stage}
          // nextWalkthrough={nextWalkthrough}
        >
          {sidebarContent}
        </Description>
      </AnimatePresence>
    </div>
  );
};

export default SideBar;
