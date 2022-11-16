import { RoleId } from "@/types/roles";
import {
  Walkthrough,
  WalkthroughMarketState,
  WalkthroughScenario,
} from "@/types/walkthrough";
import { getNextScenarioId, parseScenarioId } from "@/utils/walkthroughs";
import { useRouter } from "next/router";
import {
  createContext,
  useState,
  useContext,
  FunctionComponent,
  Dispatch,
  SetStateAction,
  useMemo,
  ReactNode,
  useCallback,
} from "react";

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
};

const WalkthroughContext = createContext<WalkthroughContextType | null>(null);

type WalkthroughProviderProps = {
  scenarioId: string;
  children: ReactNode;
};

export const WalkthroughProvider: FunctionComponent<WalkthroughProviderProps> = ({
  scenarioId,
  children,
})  => {
  const { roleId, scenario, walkthrough } = parseScenarioId(scenarioId);
  const [stage, setStage] = useState(1);
  const router = useRouter();
  const [marketState, setMarketState] = useState<WalkthroughMarketState>(
    WalkthroughMarketState.pending,
  );

  const isMarketSolving = (
    marketState >= WalkthroughMarketState.calculating_winners
    && marketState < WalkthroughMarketState.solved
  );

  const nextScenarioId = getNextScenarioId(scenarioId);
  const hasPreviousStage = stage > 1 && !isMarketSolving;

  const hasNextStage = (
    (stage < scenario.options.stages - 1 || !!nextScenarioId)
    && !(
      stage === scenario.options.allow_button_click
      || marketState === WalkthroughMarketState.solvable
      || isMarketSolving
    )
  );

  const maxStage = scenario.options.stages;

  const goToPreviousStage = useCallback(() => {
    if (stage > 1) setStage((prev) => prev - 1);
  }, [stage]);

  const goToNextStage = useCallback(() => {
    if (maxStage && stage < maxStage) {
      setStage((prev) => prev + 1);

      return;
    }

    if (nextScenarioId) {
      router.push(`/how-it-works/${nextScenarioId}`);
    }
  }, [stage, maxStage, nextScenarioId, router]);

  const goToNextMarketState = useCallback(() => {
    setStage((prev) => prev + 1);
    setMarketState((prev) => prev + 1);
  }, []);

  const value = useMemo((): WalkthroughContextType => ({
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
  }), [
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
  ]);

  return (
    <WalkthroughContext.Provider
      value={value}
    >
      {children}
    </WalkthroughContext.Provider>
  );
}

export const useWalkthroughContext = (): WalkthroughContextType => {
  const context = useContext(WalkthroughContext);

  if (!context) {
    throw new Error(
      'useWalkthroughContext must be called from within a WalkthroughProvider',
    );
  }

  return context;
}