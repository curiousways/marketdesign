import { FC, MouseEvent, MouseEventHandler, useEffect } from 'react';
import { sentenceCase } from 'change-case';
import { useWalkthroughContext } from '../../../context/WalkthroughContext';
import { WalkthroughMarketState } from '../../../types/walkthrough';
import {
  getNextScenarioId,
  parseScenarioId,
} from '../../../utils/walkthroughs';
import { SideBar } from '../Sidebar';
import { RoleId } from '../../../types/roles';
import { Market } from '../Market';

const MARKET_SOLVING_TIMEOUT = 4000;

const getWalkthroughTitle = (roleId: RoleId, walkthroughIndex: number) => {
  if (roleId === 'generic') {
    return `WALKTHROUGH ${walkthroughIndex}`;
  }

  return `WALKTHROUGH - ${sentenceCase(roleId)} ${walkthroughIndex + 1}`;
};

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

export const Walkthrough: FC = () => {
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

  useEffect(() => {
    // For the case where the user submits the form and puts the market into a
    // solveable state, then clicks the back button.
    if (isFormEnabled) {
      setMarketState(WalkthroughMarketState.pending);
    }
  }, [isFormEnabled, setMarketState]);

  const onFormSubmit = () => {
    // Proceed to next stage and market state when submit button is clicked.
    goToNextStage();
    setMarketState(WalkthroughMarketState.solvable);
  };

  return (
    <main>
      <div className="flex items-stretch font-poppins relative border-t border-green-dark min-h-screen">
        <SideBar
          title={walkthrough.title}
          subtitle={getWalkthroughTitle(roleId, walkthroughIndex)}
          hasNextPage={hasNextStage}
          hasPreviousPage={hasPreviousStage}
          onNextClick={goToNextStage}
          onPreviousClick={goToPreviousStage}
          showSolveMarketBtn={marketState === WalkthroughMarketState.solvable}
          showDetailsWidget={scenario.options.showDetailsWidget}
          onSolveMarketClick={onSolveMarketClick}
          sidebarContent={scenario.sidebarContent?.[stage]}
          isFormEnabled={isFormEnabled}
          isDivisibleInputEnabled={isFormEnabled && allowDivision}
          showDivisibleInput={showDivisibleInput}
          isMarketSolvable={marketState >= WalkthroughMarketState.solvable}
          onFormSubmit={onFormSubmit}
          roleId={roleId}
          projects={scenario.myProjects}
        />
        <Market
          myProjects={scenario.myProjects}
          buyerProjects={scenario.buyerProjects}
          sellerProjects={scenario.sellerProjects}
          isMarketSolvable={marketState > WalkthroughMarketState.solvable}
          showAllProjects={marketState < WalkthroughMarketState.solvable}
          showWinners={marketState >= WalkthroughMarketState.showing_winners}
          showSurpluses={
            marketState >= WalkthroughMarketState.showing_surpluses
          }
          isMarketSolved={marketState === WalkthroughMarketState.solved}
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
        />
      </div>
    </main>
  );
};
