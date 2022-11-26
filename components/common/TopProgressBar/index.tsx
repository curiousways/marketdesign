import { FC, useEffect, useState } from 'react';
import LoadingBar from 'react-top-loading-bar';
import { useWalkthroughContext } from '@/context/WalkthroughContext';
import { WalkthroughMarketState } from '@/types/walkthrough';

const MARKET_SOLVING_TIMEOUT = 4000;
const MARKET_SOLVING_STAGES = 5;

export const TopProgressBar: FC = () => {
  const { scenario, isMarketSolving, marketState } = useWalkthroughContext();

  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (typeof scenario.fixedMarketState !== 'undefined') {
      return;
    }

    if (isMarketSolving) {
      setProgress((100 / MARKET_SOLVING_STAGES) * (marketState - 1));

      return;
    }

    if (marketState === WalkthroughMarketState.solved) {
      setProgress(100);
    }
  }, [scenario.fixedMarketState, isMarketSolving, marketState]);

  return (
    <LoadingBar
      color="#7DBB67"
      height={3}
      progress={progress}
      loaderSpeed={MARKET_SOLVING_TIMEOUT + 1000}
      waitingTime={MARKET_SOLVING_TIMEOUT}
      shadow={false}
    />
  );
};
