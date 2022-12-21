import { Products } from './products';

export interface Project {
  title: string;
  subtitle?: string;
  cost: number | number[];
  products: Products;
  costPerCredit?: number;
  isInactive?: boolean;
  fixedBid?: number;
  accepted: (value: number) => boolean | number;
  discountOrBonus: number;
  mapRegions?: string[];
  groupId?: string;
  sharedCost?: number;
}

// My projects require either a cost per credit or a highlighted map region, but
// not both.
export type MyProject = Project &
  (
    | { mapRegions: string[]; costPerCredit?: never }
    | { mapIndex?: never; costPerCredit: number }
  );
