import { RoleId } from './roles';

export type HighlightedMapRegion = {
  roleId: RoleId;
  regions: string[];
  label?: string;
};
