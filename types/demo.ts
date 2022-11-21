export interface Data {
  rule: string;
  surplus: number;
  surplus_shares: Payments;
  payments: Payments;
  problem: Problem;
}

export interface Payments {
  seller1: number;
  buyer1: number;
  buyer2: number;
}

export interface Problem {
  goods: string[];
  free_disposal: boolean;
  bidders: Bidder[];
}

export interface Bidder {
  name: string;
  bids: Bid[];
  winningBids?: Bid[];
  losingBids?: Bid[];
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
