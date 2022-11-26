import { FC, MouseEvent, MouseEventHandler, useEffect } from 'react';
import MainContent from '@/components/walkthroughs/Main/MainContent';
import { useWalkthroughContext } from '../../../context/WalkthroughContext';
import { WalkthroughMarketState } from '../../../types/walkthrough';
import { parseScenarioId } from '../../../utils/walkthroughs';
import { SideBar } from '../Sidebar';

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
          subtitle={`WALKTHROUGH ${walkthroughIndex + 1}`}
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
        <MainContent />
      </div>
    </main>
  );
};
