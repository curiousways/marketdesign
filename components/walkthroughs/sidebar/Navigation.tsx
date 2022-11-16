import { motion } from "framer-motion";

import { WalkthroughScenario } from "@/types/walkthrough";

import NextButton from "./NextButton";
import PrevButton from "./PrevButton";
import { parseScenarioId } from "@/utils/walkthroughs";

type Props = {
  title: string;
  scenarioId: string;
  stage: number;
  next: () => void;
  previous: () => void;
  data: WalkthroughScenario;
};

const Navigation = ({
  title,
  scenarioId,
  stage,
  next,
  previous,
  data,
}: Props) => {
  const { walkthroughIndex } = parseScenarioId(scenarioId);

  return (
    <motion.div layout className="text-center text-xl w-full">
      <p className="text-green-dark">WALKTHROUGH {walkthroughIndex + 1}</p>
      <div className="flex gap-x-4 items-center justify-between">
        {/* Previous button */}
        <PrevButton
          onClick={previous}
          stage={stage}
          hideButton={data.options.hide_prev_button}
        />

        <div
          className="bg-green-dark text-white rounded-lg px-3 py-1 flex-1"
        >
          <p>{title}</p>
        </div>

        {/* Next button */}
        <NextButton
          onClick={next}
          stage={stage}
          hideButton={data.options.hide_next_button}
        />
      </div>
    </motion.div>
  );
};

export default Navigation;
