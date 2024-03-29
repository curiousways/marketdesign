import {
  createContext,
  FunctionComponent,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import { getAdjustedCost, isProjectEqual } from '@/utils/project';
import { Project } from '../types/project';

type ProjectsContextType = {
  getProjectCost: (project: Project, sumCredits?: boolean) => number;
  setProjectCost: (project: Project, cost: number) => void;
  getAcceptedProjectCost: (project: Project) => number;
  isProjectDivisible: (project: Project) => boolean;
  setIsProjectDivisible: (project: Project, divisible: boolean) => void;
};

type ProjectsState = {
  project: Project;
  cost?: number;
  divisible?: boolean;
}[];

type ProjectsUpdateCostAction = {
  type: 'UPDATE_COST';
  value: { project: Project; cost: number };
};

type ProjectsUpdateDivisibilityAction = {
  type: 'UPDATE_DIVISIBILITY';
  value: { project: Project; divisible: boolean };
};

type ProjectsAction =
  | ProjectsUpdateCostAction
  | ProjectsUpdateDivisibilityAction;

const findEntry = (state: ProjectsState, project: Project) =>
  state.find((item) => isProjectEqual(item.project, project));

const reducer = (
  state: ProjectsState,
  action: ProjectsAction,
): ProjectsState => {
  switch (action.type) {
    case 'UPDATE_COST': {
      const { project, cost } = action.value;
      const entry = findEntry(state, action.value.project);

      if (entry) {
        entry.cost = cost;

        return state;
      }

      return [...state, { project, cost }];
    }

    case 'UPDATE_DIVISIBILITY': {
      const { project, divisible } = action.value;
      const entry = findEntry(state, action.value.project);

      if (entry) {
        entry.divisible = divisible;

        return state;
      }

      return [...state, { project, divisible }];
    }

    default:
      throw new Error('Unknown action');
  }
};

export const ProjectsContext = createContext<ProjectsContextType | null>(null);

type ProjectsProviderProps = {
  children: ReactNode;
};

export const ProjectsProvider: FunctionComponent<ProjectsProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, []);

  const setProjectCost = useCallback((project: Project, cost: number) => {
    dispatch({ type: 'UPDATE_COST', value: { project, cost } });
  }, []);

  const setIsProjectDivisible = useCallback(
    (project: Project, divisible: boolean) => {
      dispatch({ type: 'UPDATE_DIVISIBILITY', value: { project, divisible } });
    },
    [],
  );

  const getProjectCost = useCallback(
    (project: Project, sumCredits?: boolean): number => {
      const [count] = Object.values(project.products).filter((x) => x);

      if (sumCredits && project.costPerCredit) {
        return project.costPerCredit * count;
      }

      const { cost: dynamicProjectCost } = findEntry(state, project) ?? {};

      if (dynamicProjectCost) {
        return dynamicProjectCost;
      }

      if (Array.isArray(project.cost)) {
        return 0;
      }

      return project.cost;
    },
    [state],
  );

  const isProjectDivisible = useCallback(
    (project: Project): boolean => {
      const { divisible = false } = findEntry(state, project) ?? {};

      return divisible;
    },
    [state],
  );

  const getAcceptedProjectCost = useCallback(
    (project: Project): number => {
      const cost = getProjectCost(project);
      const accepted = project.accepted(cost);

      return getAdjustedCost(cost, accepted);
    },
    [getProjectCost],
  );

  const value = useMemo(
    (): ProjectsContextType => ({
      getProjectCost,
      setProjectCost,
      getAcceptedProjectCost,
      isProjectDivisible,
      setIsProjectDivisible,
    }),
    [
      getProjectCost,
      setProjectCost,
      getAcceptedProjectCost,
      isProjectDivisible,
      setIsProjectDivisible,
    ],
  );

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjectsContext = (): ProjectsContextType => {
  const context = useContext(ProjectsContext);

  if (!context) {
    throw new Error(
      'useProjectsContext must be called from within a ProjectsProvider',
    );
  }

  return context;
};
