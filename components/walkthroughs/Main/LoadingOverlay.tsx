import { motion } from "framer-motion";

import { WalkthroughMarketState } from "@/types/walkthrough";
import { fadeInDown } from "@/utils/animations";
import { useWalkthroughContext } from "@/context/WalkthroughContext";

const getOverlayText = (marketState: WalkthroughMarketState) => {
  if (marketState === WalkthroughMarketState.calculating_winners) {
    return 'Determining Market Winners';
  }

  if (marketState === WalkthroughMarketState.distributing_surpluss) {
    return 'Distributing Market Surplus';
  }

  if (marketState === WalkthroughMarketState.calculating_final_payments) {
    return 'Calculating Final Payments';
  }
}

const LoadingOverlay = () => {
  const { marketState } = useWalkthroughContext();
  const overlayText = getOverlayText(marketState);

  if (!overlayText) {
    return null;
  }

  return (
    <motion.div
      variants={fadeInDown}
      initial="hidden"
      whileInView="visible"
      className="absolute top-0 left-0 w-full h-full bg-black/70 flex justify-center items-center"
    >
      <div className="flex flex-col items-center">
        <p className="text-center text-white text-2xl font-bold">
          {overlayText}
        </p>

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
