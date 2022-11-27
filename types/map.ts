import { RoleId } from './roles';

export type HighlightedMapRegions = Partial<{
  [key in RoleId]: number | string[];
}>;
