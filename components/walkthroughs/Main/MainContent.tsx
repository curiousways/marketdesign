import { useEffect } from "react";

import LoadingOverlay from "./LoadingOverlay";
import { useWalkthroughContext } from "@/context/WalkthroughContext";
import { WalkthroughMarketState } from "@/types/walkthrough";
import MainContentBody from "./MainContentBody";

const MainContent = () => {
  const {
    isMarketSolving,
    marketState,
    goToNextMarketState,
  } = useWalkthroughContext();

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (
      marketState === WalkthroughMarketState.showing_winners ||
      marketState === WalkthroughMarketState.showing_surpluses
    ) {
      timer = setTimeout(goToNextMarketState, 5000);

      return;
    }

    if (isMarketSolving) {
      timer = setTimeout(goToNextMarketState, 4000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [
    isMarketSolving,
    marketState,
    goToNextMarketState,
  ]);

  return (
    <div className="border-l border-green-dark pt-4 pb-24 w-full relative flex justify-center">
      <LoadingOverlay />
      <MainContentBody />
    </div>
  );
};

export default MainContent;
