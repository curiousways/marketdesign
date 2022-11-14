import { motion } from "framer-motion";

import { Data } from "@/types/walkthrough";

import NextButton from "./NextButton";
import PrevButton from "./PrevButton";

type Props = {
  scenarioId: string;
  stage: number;
  next: () => void;
  previous: () => void;
  data: Data;
};

const Navigation = ({ scenarioId, stage, next, previous, data }: Props) => {
  return (
    <motion.div layout className="text-center text-xl w-full">
      <p className="text-green-dark">WALKTHROUGH {scenarioId}</p>
      <div className="flex gap-x-4 items-center">
        {/* Previous button */}
        <PrevButton
          onClick={previous}
          stage={stage}
          hideButton={data.options.hide_prev_button}
        />

        <div className="bg-green-dark text-white rounded-lg px-3 py-1 max-w-[285px]">
          <p>Bidding Strategies for a Package Buyer</p>
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
