import { useCallback, useEffect } from "react";

import LoadingOverlay from "./LoadingOverlay";
import { useWalkthroughContext } from "@/context/WalkthroughContext";
import { WalkthroughMarketState } from "@/types/walkthrough";
import MainContentBody from "./MainContentBody";
import { WalkthroughBackgroundRight } from "../icons/WalkthroughBackground";
import { WalkthroughBackgroundLeft } from "../icons/WalkthroughBackgroundLeft";
import Background from "./Background";

const MARKET_SOLVING_TIMEOUT = 4000;

const MainContent = () => {
  const {
    scenario,
    isMarketSolving,
    marketState,
    setMarketState,
    goToNextMarketState,
    goToNextStage,
  } = useWalkthroughContext();

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const { fixedMarketState } = scenario;

    // Exit if the scenario is controlling the market state.
    if (typeof fixedMarketState !== 'undefined') {
      return;
    }

    if (
      marketState === WalkthroughMarketState.showing_winners ||
      marketState === WalkthroughMarketState.showing_surpluses
    ) {
      timer = setTimeout(goToNextMarketState, MARKET_SOLVING_TIMEOUT);

      return;
    }

    if (isMarketSolving) {
      timer = setTimeout(goToNextMarketState, MARKET_SOLVING_TIMEOUT);
    }

    return () => {
      clearTimeout(timer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    scenario.fixedMarketState,
    isMarketSolving,
    marketState,
  ]);

  // This is here for the intro walkthrough, which needs to manually step
  // through the market states.
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const { fixedMarketState } = scenario;

    if (typeof fixedMarketState !== 'undefined') {
      setMarketState(fixedMarketState);

      if (
        fixedMarketState === WalkthroughMarketState.calculating_winners ||
        fixedMarketState === WalkthroughMarketState.distributing_surpluss ||
        fixedMarketState === WalkthroughMarketState.calculating_final_payments
      ) {
        timer = setTimeout(goToNextStage, MARKET_SOLVING_TIMEOUT);
      }

      return;
    }

    return () => {
      clearTimeout(timer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    scenario.fixedMarketState,
    isMarketSolving,
  ]);

  return (
    <div className="border-l border-green-dark pt-4 w-full relative flex justify-center">
      <LoadingOverlay />
      <MainContentBody />
      <Background />
    </div>
  );
};

export default MainContent;
