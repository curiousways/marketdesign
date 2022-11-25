import React, {
  FC,
  FormEvent,
  FormEventHandler,
  MouseEvent,
  MouseEventHandler,
  useEffect,
} from 'react';
import { sentenceCase } from 'change-case';
import MainContent from '@/components/walkthroughs/Main/MainContent';
import { useWalkthroughContext } from '../../../context/WalkthroughContext';
import { WalkthroughMarketState } from '../../../types/walkthrough';
import { parseScenarioId } from '../../../utils/walkthroughs';
import { SideBar } from '../Sidebar';
import { RoleId } from '../../../types/roles';

const getWalkthroughTitle = (roleId: RoleId, walkthroughIndex: number) => {
  if (roleId === 'generic') {
    return `WALKTHROUGH ${walkthroughIndex}`;
  }

  return `WALKTHROUGH - ${sentenceCase(roleId)} ${walkthroughIndex + 1}`;
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
    getProjectCost,
    setProjectCost,
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

  // Proceed to next market state when submit button is clicked.
  const onFormSubmit: FormEventHandler = (event: FormEvent) => {
    event.preventDefault();
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
          getProjectCost={getProjectCost}
          setProjectCost={setProjectCost}
        />
        <MainContent />
      </div>
    </main>
  );
};
