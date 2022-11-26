import { Products } from './products';

export interface Project {
  title: string;
  subtitle?: string;
  cost: number | number[];
  products: Products;
  costPerCredit?: number;
  isInactive?: boolean;
}
