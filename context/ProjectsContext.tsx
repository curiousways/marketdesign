import {
  createContext,
  FunctionComponent,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import { isProjectEqual } from '@/utils/walkthroughs';
import { Project } from '../types/project';
import { getAdjustedCost } from '../utils/project';

type ProjectsContextType = {
  getProjectCost: (project: Project) => number;
  setProjectCost: (project: Project, cost: number) => void;
  getAcceptedProjectCost: (project: Project) => number;
};

type ProjectsState = {
  project: Project;
  cost?: number;
}[];

type ProjectsUpdateCostAction = {
  type: 'UPDATE_COST';
  value: { project: Project; cost: number };
};

type ProjectsAction = ProjectsUpdateCostAction;

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

  const getProjectCost = useCallback(
    (project: Project): number => {
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
    }),
    [getProjectCost, setProjectCost, getAcceptedProjectCost],
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
