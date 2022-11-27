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

type ProjectsContextType = {
  getProjectCost: (project: Project) => number;
  setProjectCost: (project: Project, cost: number) => void;
  getProjectMapIndex: (project: Project) => number | undefined;
  setProjectMapIndex: (project: Project, mapIndex: number) => void;
};

type ProjectsState = {
  project: Project;
  cost?: number;
  mapIndex?: number;
}[];

type ProjectsUpdateCostAction = {
  type: 'UPDATE_COST';
  value: { project: Project; cost: number };
};

type ProjectsUpdateMapIndexAction = {
  type: 'UPDATE_MAP_INDEX';
  value: { project: Project; mapIndex: number };
};

type ProjectsAction = ProjectsUpdateCostAction | ProjectsUpdateMapIndexAction;

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

    case 'UPDATE_MAP_INDEX': {
      const { project, mapIndex } = action.value;
      const entry = findEntry(state, action.value.project);

      if (entry) {
        entry.mapIndex = mapIndex;

        return state;
      }

      return [...state, { project, mapIndex }];
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

  const setProjectMapIndex = useCallback(
    (project: Project, mapIndex: number) => {
      dispatch({ type: 'UPDATE_MAP_INDEX', value: { project, mapIndex } });
    },
    [],
  );

  const getProjectMapIndex = useCallback(
    (project: Project): number | undefined => {
      const { mapIndex: dynamicMapIndex } = findEntry(state, project) ?? {};

      return dynamicMapIndex;
    },
    [state],
  );

  const value = useMemo(
    (): ProjectsContextType => ({
      getProjectCost,
      setProjectCost,
      getProjectMapIndex,
      setProjectMapIndex,
    }),
    [getProjectCost, setProjectCost, getProjectMapIndex, setProjectMapIndex],
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
