import {
  createContext,
  FunctionComponent,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { isProjectEqual } from '@/utils/walkthroughs';
import { Project } from '../types/project';

type DynamicProjectCosts = {
  project: Project;
  cost: number;
}[];

type ProjectsContextType = {
  getProjectCost: (project: Project) => number;
  setProjectCost: (project: Project, cost: number) => void;
};

export const ProjectsContext = createContext<ProjectsContextType | null>(null);

type ProjectsProviderProps = {
  children: ReactNode;
};

export const ProjectsProvider: FunctionComponent<ProjectsProviderProps> = ({
  children,
}) => {
  const [dynamicProjectCosts, setDynamicProjectCosts] =
    useState<DynamicProjectCosts>([]);

  const setProjectCost = useCallback(
    (project: Project, cost: number) => {
      setDynamicProjectCosts([{ project, cost }, ...dynamicProjectCosts]);
    },
    [dynamicProjectCosts],
  );

  const getProjectCost = useCallback(
    (project: Project): number => {
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
    (): ProjectsContextType => ({
      getProjectCost,
      setProjectCost,
    }),
    [getProjectCost, setProjectCost],
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
