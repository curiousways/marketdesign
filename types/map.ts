import { RoleId } from './roles';

export type HighlightedMapRegion = {
  label?: string;
  regionKey: string;
};

export type HighlightedMapRegions = Partial<{
  [key in RoleId]: HighlightedMapRegion[];
}>;
