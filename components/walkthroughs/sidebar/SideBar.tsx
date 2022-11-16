import React, { Dispatch, ReactNode, SetStateAction } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { fadeIn } from "@/utils/animations";
import { WalkthroughScenario } from "@/types/walkthrough";

import Description from "./Description";
import Details from "./Details";
import Navigation from "./Navigation";
import { getNextScenarioId } from "@/utils/walkthroughs";
import { useRouter } from "next/router";
import { RoleId } from "@/types/roles";

type Props = {
  title: string;
  scenarioId: string;
  roleId: RoleId;
  stage: number;
  setStage: Dispatch<SetStateAction<number>>;
  data: WalkthroughScenario;
  sidebarContent: ReactNode;
};

const SideBar = ({
  title,
  scenarioId,
  roleId,
  stage,
  setStage,
  data,
  sidebarContent,
}: Props) => {
  const maxStage = data.options.stages;
  const showSolveMarketBtn = data.options.show_solve_market;
  const nextScenarioId = getNextScenarioId(scenarioId);
  const router = useRouter();

  const previous = () => {
    if (stage > 1) setStage((prev) => prev - 1);
  };

  const next = () => {
    if (maxStage && stage < maxStage) {
      setStage((prev) => prev + 1);

      return;
    }

    if (nextScenarioId) {
      router.push(`/how-it-works/${nextScenarioId}`);
    }
  };

  const onButtonClick = (e: React.FormEvent) => {
    e.preventDefault();
    next();
  };

  return (
    <div className="max-w-[434px] py-4 px-5 flex flex-col gap-y-8 items-center">
      <AnimatePresence>
        {/* Top */}
        {stage >= data.options.show_details_widget && (
          <Details
            next={next}
            data={data}
            stage={stage}
            roleId={roleId}
          />
        )}

        {/* Solve Market Button */}
        {stage === showSolveMarketBtn && (
          <motion.button
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
          title={title}
          scenarioId={scenarioId}
          stage={stage}
          next={next}
          previous={previous}
          data={data}
        />

        {/* Walkthrough Description text */}
        <Description>
          {sidebarContent}
        </Description>
      </AnimatePresence>
    </div>
  );
};

export default SideBar;
