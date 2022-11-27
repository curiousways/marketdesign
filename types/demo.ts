import { RoleId } from './roles';

export type DemoBid = {
  v: number;
  q: {
    biodiversity: number;
    nutrients: number;
  };
  divisibility: number;
};

export type DemoBidder = {
  name: string;
  bids: DemoBid[];
};

export type DemoState = {
  free_disposal: boolean;
  bidders: DemoBidder[];
};

export type DemoTrader = {
  name: string;
  role: RoleId;
  locations: string[];
  enable_divisibility_element: boolean;
};

export type DemoData = {
  title: string;
  categories: string[];
  description: string;
  playable_traders: DemoTrader[];
  states: DemoState[];
};

export type DemoFile = {
  slug: string;
  data: DemoData;
};
