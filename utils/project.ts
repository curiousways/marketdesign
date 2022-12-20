import objectHash from 'object-hash';
import { Project } from '../types/project';

export const getAdjustedCost = (cost: number, accepted: boolean | number) =>
  typeof accepted === 'number' ? (accepted / 100) * cost : cost;

export const getGroupedProjects = (projects: Project[], project: Project) =>
  project.groupId
    ? projects.filter(({ groupId }) => groupId === project.groupId)
    : [project];

export const isProjectEqual = (projectA: Project, projectB: Project) =>
  projectA.title === projectB.title && projectA.subtitle === projectB.subtitle;

export const includesProject = (
  project: Project,
  projectsToCheck: Project[],
): boolean =>
  !!projectsToCheck.find((checkedProject) =>
    isProjectEqual(checkedProject, project),
  );

export const findProjectIndex = (project: Project, projects: Project[]) =>
  projects.findIndex((p) => isProjectEqual(p, project));

export const getUniqueProjectKey = (project: Project) =>
  objectHash({
    title: project.title,
    subtitle: project.subtitle,
    products: project.products,
    mapRegions: project.mapRegions,
  });
