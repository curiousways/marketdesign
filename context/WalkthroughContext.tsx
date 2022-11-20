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
import {
  Walkthrough,
  WalkthroughMarketState,
  WalkthroughProject,
  WalkthroughScenario,
} from '@/types/walkthrough';
import {
  getNextScenarioId,
  isProjectEqual,
  parseScenarioId,
} from '@/utils/walkthroughs';

type DynamicProjectCosts = {
  project: WalkthroughProject;
  cost: number;
}[];

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
  marketState: WalkthroughMarketState;
  goToNextMarketState: () => void;
  setMarketState: Dispatch<SetStateAction<WalkthroughMarketState>>;
  getProjectCost: (project: WalkthroughProject) => number;
  setProjectCost: (project: WalkthroughProject, cost: number) => void;
};

const WalkthroughContext = createContext<WalkthroughContextType | null>(null);

type WalkthroughProviderProps = {
  scenarioId: string;
  children: ReactNode;
};

export const WalkthroughProvider: FunctionComponent<
  WalkthroughProviderProps
> = ({ scenarioId, children }) => {
  const { roleId, getScenario, walkthrough } = parseScenarioId(scenarioId);
  const [stage, setStage] = useState(1);
  const [dynamicProjectCosts, setDynamicProjectCosts] =
    useState<DynamicProjectCosts>([]);

  const scenario = getScenario(stage);
  const router = useRouter();
  const [marketState, setMarketState] = useState<WalkthroughMarketState>(
    WalkthroughMarketState.pending,
  );

  const isMarketCalculating =
    marketState === WalkthroughMarketState.calculating_winners ||
    marketState === WalkthroughMarketState.distributing_surpluss ||
    marketState === WalkthroughMarketState.calculating_final_payments;

  const isMarketSolving =
    marketState >= WalkthroughMarketState.calculating_winners &&
    marketState < WalkthroughMarketState.solved &&
    typeof scenario.fixedMarketState === 'undefined';

  const nextScenarioId = getNextScenarioId(scenarioId);
  const hasPreviousStage =
    stage > 1 && !isMarketSolving && !isMarketCalculating;

  const hasNextStage =
    (stage < scenario.options.stages || !!nextScenarioId) &&
    !(
      scenario.options.isFormEnabled ||
      marketState === WalkthroughMarketState.solvable ||
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

  const setProjectCost = useCallback(
    (project: WalkthroughProject, cost: number) => {
      setDynamicProjectCosts([{ project, cost }, ...dynamicProjectCosts]);
    },
    [dynamicProjectCosts],
  );

  const getProjectCost = useCallback(
    (project: WalkthroughProject): number => {
      const { cost: dynamicProjectCost } =
        dynamicProjectCosts.find((item) =>
          isProjectEqual(item.project, project),
        ) ?? {};

      if (dynamicProjectCost) {
        return dynamicProjectCost;
      }

      if (Array.isArray(project.cost)) {
        return 0;
      }

      return project.cost;
    },
    [dynamicProjectCosts],
  );

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
      getProjectCost,
      setProjectCost,
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
      getProjectCost,
      setProjectCost,
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
