import { useRouter } from 'next/router';
import {
  createContext,
  Dispatch,
  FunctionComponent,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { RoleId } from '@/types/roles';
import { Walkthrough, WalkthroughScenario } from '@/types/walkthrough';
import { getNextScenarioId, parseScenarioId } from '@/utils/walkthroughs';
import { MarketState } from '../types/market';
import { useProjectsContext } from './ProjectsContext';

type WalkthroughContextType = {
  scenarioId: string;
  walkthrough: Walkthrough;
  stage: number;
  scenario: WalkthroughScenario;
  roleId: RoleId;
  setStage: Dispatch<SetStateAction<number>>;
  hasPreviousStage: boolean;
  hasNextStage: boolean;
  goToPreviousStage: () => void;
  goToNextStage: () => void;
  isMarketSolving: boolean;
  marketState: MarketState;
  goToNextMarketState: () => void;
  setMarketState: Dispatch<SetStateAction<MarketState>>;
};

const WalkthroughContext = createContext<WalkthroughContextType | null>(null);

type WalkthroughProviderProps = {
  scenarioId: string;
  children: ReactNode;
};

export const WalkthroughProvider: FunctionComponent<
  WalkthroughProviderProps
> = ({ scenarioId, children }) => {
  const { getProjectCost } = useProjectsContext();
  const { roleId, getScenario, walkthrough } = parseScenarioId(scenarioId);
  const [stage, setStage] = useState(1);

  const scenario = getScenario(stage, { getProjectCost });
  const router = useRouter();
  const [marketState, setMarketState] = useState<MarketState>(
    MarketState.pending,
  );

  const isMarketCalculating =
    marketState === MarketState.calculating_winners ||
    marketState === MarketState.distributing_surpluss ||
    marketState === MarketState.calculating_final_payments;

  const isMarketSolving =
    marketState >= MarketState.calculating_winners &&
    marketState < MarketState.solved &&
    typeof scenario.fixedMarketState === 'undefined';

  const nextScenarioId = getNextScenarioId(scenarioId);
  const hasPreviousStage =
    stage > 1 && !isMarketSolving && !isMarketCalculating;

  const hasNextStage =
    (stage < scenario.options.stages || !!nextScenarioId) &&
    !(
      scenario.options.isFormEnabled ||
      marketState === MarketState.solvable ||
      isMarketCalculating ||
      isMarketSolving
    );

  const maxStage = scenario.options.stages;

  const goToPreviousStage = useCallback(() => {
    if (stage > 1) {
      setStage((prev) => prev - 1);
    }
  }, [stage]);

  const goToNextStage = useCallback(() => {
    if (maxStage && stage < maxStage) {
      setStage((prev) => prev + 1);

      return;
    }

    if (nextScenarioId) {
      void router.push(`/how-it-works/${nextScenarioId}`);
    }
  }, [stage, maxStage, nextScenarioId, router]);

  const goToNextMarketState = useCallback(() => {
    setStage((prev) => prev + 1);
    setMarketState((prev) => prev + 1);
  }, []);

  const value = useMemo(
    (): WalkthroughContextType => ({
      scenarioId,
      walkthrough,
      stage,
      scenario,
      roleId,
      setStage,
      setMarketState,
      hasPreviousStage,
      hasNextStage,
      goToNextStage,
      goToPreviousStage,
      isMarketSolving,
      marketState,
      goToNextMarketState,
    }),
    [
      scenarioId,
      walkthrough,
      stage,
      scenario,
      roleId,
      hasPreviousStage,
      hasNextStage,
      goToNextStage,
      goToPreviousStage,
      isMarketSolving,
      marketState,
      goToNextMarketState,
    ],
  );

  return (
    <WalkthroughContext.Provider value={value}>
      {children}
    </WalkthroughContext.Provider>
  );
};

export const useWalkthroughContext = (): WalkthroughContextType => {
  const context = useContext(WalkthroughContext);

  if (!context) {
    throw new Error(
      'useWalkthroughContext must be called from within a WalkthroughProvider',
    );
  }

  return context;
};
