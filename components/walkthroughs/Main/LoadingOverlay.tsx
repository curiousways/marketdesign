import { motion } from "framer-motion";

import { WalkthroughData } from "@/types/walkthrough";
import { fadeInDown } from "@/utils/animations";

type Props = {
  stage: number;
  data: WalkthroughData;
};

const LoadingOverlay = ({ stage, data }: Props) => {
  return (
    <motion.div
      variants={fadeInDown}
      initial="hidden"
      whileInView="visible"
      className="absolute top-0 left-0 w-full h-full bg-black/70 z-10 flex justify-center items-center"
    >
      <div className="flex flex-col items-center">
        {stage === data.options.show_calculating_winners && (
          <p className="text-center text-white text-2xl font-bold">
            Determining Market Winners
          </p>
        )}
        {stage === data.options.show_distributing_surplus && (
          <p className="text-center text-white text-2xl font-bold">
            Distributing Market Surplus
          </p>
        )}

        {stage === data.options.show_calculating_final && (
          <p className="text-center text-white text-2xl font-bold">
            Calculating Final Payments
          </p>
        )}

        <div className="lds-ellipsis inline-block relative w-[80px] h-[80px]">
          <div className="bg-green-light absolute top-[33px] left-[8px] w-[15px] h-[15px] rounded-full"></div>
          <div className="bg-blue-light absolute top-[33px] left-[8px] w-[15px] h-[15px] rounded-full"></div>
          <div className="bg-dark-grey absolute top-[33px] left-[32px] w-[15px] h-[15px] rounded-full"></div>
          <div className="bg-dark-grey absolute top-[33px] left-[56px] w-[15px] h-[15px] rounded-full"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingOverlay;
