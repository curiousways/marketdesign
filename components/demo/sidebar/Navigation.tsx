import { motion } from "framer-motion";

import { WalkthroughData } from "@/types/walkthrough";

import NextButton from "./NextButton";
import PrevButton from "./PrevButton";

type Props = {
  next: () => void;
  previous: () => void;
};

const Navigation = ({ next, previous }: Props) => {
  return (
    <motion.div layout className="text-center text-xl w-full">
      {/* <p className="text-green-dark">WALKTHROUGH</p> */}
      <div className="flex gap-x-4 items-center">
        {/* Previous button */}
        <PrevButton onClick={previous} />

        <div className="bg-green-dark text-white rounded-lg px-3 py-1 max-w-[285px]">
          <p>Bidding Strategies for a Package Buyer</p>
        </div>

        {/* Next button */}
        <NextButton onClick={next} />
      </div>
    </motion.div>
  );
};

export default Navigation;
