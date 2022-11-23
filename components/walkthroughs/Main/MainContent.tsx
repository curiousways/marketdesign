import { useEffect } from 'react';

import { useWalkthroughContext } from '@/context/WalkthroughContext';
import { WalkthroughMarketState } from '@/types/walkthrough';
import { LoadingOverlay } from '../../common/LoadingOverlay';
import MainContentBody from './MainContentBody';
import Background from './Background';
import { TopProgressBar } from './TopProgressBar';

const MARKET_SOLVING_TIMEOUT = 4000;

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
};

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
  }, [scenario.fixedMarketState, isMarketSolving, marketState]);

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
  }, [scenario.fixedMarketState, isMarketSolving]);

  return (
    <div className="border-l border-green-dark pt-8 w-full relative flex justify-center">
      <div className="z-20">
        <TopProgressBar />
        <LoadingOverlay text={getOverlayText(marketState)} />
      </div>
      <div className="z-10">
        <MainContentBody />
      </div>
      <Background />
    </div>
  );
};

export default MainContent;
