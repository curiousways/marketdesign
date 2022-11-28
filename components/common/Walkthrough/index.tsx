import { FC, MouseEvent, MouseEventHandler, useEffect, useState } from 'react';
import { sentenceCase } from 'change-case';
import { useWalkthroughContext } from '../../../context/WalkthroughContext';
import {
  getNextScenarioId,
  parseScenarioId,
} from '../../../utils/walkthroughs';
import { SideBar } from '../Sidebar';
import { RoleId } from '../../../types/roles';
import { Market } from '../Market';
import { MarketState } from '../../../types/market';
import { MainContainer } from '../MainContainer';

const MARKET_SOLVING_TIMEOUT = 4000;
const MARKET_SOLVING_STAGES = 5;

const getWalkthroughTitle = (roleId: RoleId, walkthroughIndex: number) => {
  if (roleId === 'generic') {
    return `WALKTHROUGH ${walkthroughIndex}`;
  }

  return `WALKTHROUGH - ${sentenceCase(roleId)} ${walkthroughIndex + 1}`;
};

const getOverlayText = (marketState: MarketState) => {
  if (marketState === MarketState.calculating_winners) {
    return 'Determining Market Winners';
  }

  if (marketState === MarketState.distributing_surpluss) {
    return 'Distributing Market Surplus';
  }

  if (marketState === MarketState.calculating_final_payments) {
    return 'Calculating Final Payments';
  }
};

export const Walkthrough: FC = () => {
  const [loadingBarProgress, setLoadingBarProgress] = useState<number>(0);
  const {
    scenarioId,
    walkthrough,
    stage,
    scenario,
    roleId,
    setMarketState,
    hasPreviousStage,
    hasNextStage,
    goToNextStage,
    goToPreviousStage,
    marketState,
    goToNextMarketState,
    isMarketSolving,
  } = useWalkthroughContext();

  const onSolveMarketClick: MouseEventHandler = (
    e: MouseEvent<HTMLElement>,
  ) => {
    e.preventDefault();
    goToNextMarketState();
  };

  const { walkthroughIndex } = parseScenarioId(scenarioId);
  const { isFormEnabled, allowDivision, showDivisibleInput } = scenario.options;

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const { fixedMarketState } = scenario;

    // Exit if the scenario is controlling the market state.
    if (typeof fixedMarketState !== 'undefined') {
      return;
    }

    if (
      marketState === MarketState.showing_winners ||
      marketState === MarketState.showing_surpluses
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
        fixedMarketState === MarketState.calculating_winners ||
        fixedMarketState === MarketState.distributing_surpluss ||
        fixedMarketState === MarketState.calculating_final_payments
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

  useEffect(() => {
    // For the case where the user submits the form and puts the market into a
    // solveable state, then clicks the back button.
    if (isFormEnabled) {
      setMarketState(MarketState.pending);
    }
  }, [isFormEnabled, setMarketState]);

  const onFormSubmit = () => {
    // Proceed to next stage and market state when submit button is clicked.
    goToNextStage();
    setMarketState(MarketState.solvable);
  };

  useEffect(() => {
    if (typeof scenario.fixedMarketState !== 'undefined') {
      return;
    }

    if (isMarketSolving) {
      setLoadingBarProgress((100 / MARKET_SOLVING_STAGES) * (marketState - 1));

      return;
    }

    if (marketState === MarketState.solved) {
      setLoadingBarProgress(100);
    }
  }, [scenario.fixedMarketState, isMarketSolving, marketState]);

  return (
    <MainContainer>
      <SideBar
        hasFixedBids
        title={walkthrough.title}
        subtitle={getWalkthroughTitle(roleId, walkthroughIndex)}
        hasNextPage={hasNextStage}
        hasPreviousPage={hasPreviousStage}
        onNextClick={goToNextStage}
        onPreviousClick={goToPreviousStage}
        showSolveMarketBtn={marketState === MarketState.solvable}
        showDetailsWidget={scenario.options.showDetailsWidget}
        onSolveMarketClick={onSolveMarketClick}
        sidebarContent={scenario.sidebarContent?.[stage]}
        isFormEnabled={isFormEnabled}
        isDivisibleInputEnabled={isFormEnabled && allowDivision}
        showDivisibleInput={showDivisibleInput}
        isMarketSolvable={marketState >= MarketState.solvable}
        onFormSubmit={onFormSubmit}
        roleId={roleId}
        projects={scenario.myProjects}
      />
      <Market
        myProjects={scenario.myProjects}
        buyerProjects={scenario.buyerProjects}
        sellerProjects={scenario.sellerProjects}
        showCosts={marketState > MarketState.solvable}
        showAllProjects={marketState < MarketState.solvable}
        showWinners={marketState >= MarketState.showing_winners}
        showSurpluses={marketState >= MarketState.showing_surpluses}
        isMarketSolved={marketState === MarketState.solved}
        roleId={roleId}
        link={
          stage === scenario.options.stages && !getNextScenarioId(scenarioId)
            ? {
                text: 'Return to Walkthrough index',
                href: `/how-it-works#${roleId}`,
              }
            : undefined
        }
        showParticipants={scenario.options.showParticipants}
        showMap={scenario.options.showMaps}
        highlightedMapRegions={scenario.options.highlightedMapRegions}
        loadingOverlayText={getOverlayText(marketState)}
        loadingBar={{
          progress: loadingBarProgress,
          loaderSpeed: MARKET_SOLVING_TIMEOUT + 1000,
          waitingTime: MARKET_SOLVING_TIMEOUT,
        }}
      />
    </MainContainer>
  );
};
