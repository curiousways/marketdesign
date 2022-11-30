import { Project } from '../types/project';

export const getAdjustedCost = (cost: number, accepted: boolean | number) =>
  typeof accepted === 'number' ? (accepted / 100) * cost : cost;

export const getGroupedProjects = (projects: Project[], project: Project) =>
  project.groupId
    ? projects.filter(({ groupId }) => groupId === project.groupId)
    : [project];
