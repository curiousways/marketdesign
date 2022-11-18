import { motion } from "framer-motion";

import NextButton from "./NextButton";
import PrevButton from "./PrevButton";
import { parseScenarioId } from "@/utils/walkthroughs";
import { useWalkthroughContext } from "@/context/WalkthroughContext";

const Navigation = () => {
  const {
    walkthrough,
    scenarioId,
    stage,
    hasPreviousStage,
    hasNextStage,
    goToPreviousStage,
    goToNextStage,
  } = useWalkthroughContext();

  const { walkthroughIndex } = parseScenarioId(scenarioId);

  return (
    <motion.div layout className="text-center text-xl w-full">
      <p className="text-green-dark">WALKTHROUGH {walkthroughIndex + 1} {stage}</p>
      <div className="flex gap-x-4 items-center justify-between">
        {/* Previous button */}
        <PrevButton
          onClick={goToPreviousStage}
          stage={stage}
          hideButton={!hasPreviousStage}
        />

        <div
          className="bg-green-dark text-white rounded-lg px-3 py-1 flex-1"
        >
          <p>{walkthrough.title}</p>
        </div>

        {/* Next button */}
        <NextButton
          onClick={goToNextStage}
          stage={stage}
          hideButton={!hasNextStage}
        />
      </div>
    </motion.div>
  );
};

export default Navigation;
