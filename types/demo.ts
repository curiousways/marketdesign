export interface Data {
  rule: string;
  surplus: number;
  surplus_shares: Payments;
  payments: Payments;
  problem: Problem;
}

export interface Payments {
  [key: string]: number;
}

export interface Problem {
  goods: string[];
  free_disposal: boolean;
  bidders: Bidder[];
}

export interface Bidder {
  name: string;
  bids: Bid[];
}

export interface Bid {
  v: number;
  q: Q;
  winning?: number;
  divisibility?: number;
}

export interface Q {
  biodiversity: number;
  nutrients: number;
}

export interface MarketData {
  categories: string[];
  title: string;
  description: string;
  playableTraders: PlayableTrader[];
  states: State[];
}

export interface PlayableTrader {
  name: string;
  role: string;
  locations: string[];
  enableDivisibilityElement: boolean;
}

export interface State {
  freeDisposal: boolean;
  bidders: Bidder[];
}

export type Role = string | undefined;
