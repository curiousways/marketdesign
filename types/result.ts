export type Bid = {
  v: number;
  q: {
    biodiversity: number;
    nutrients: number;
  };
  winning?: number;
  label?: string;
  divisibility?: number;
};

type Bidder = {
  name: string;
  bids: Bid[];
};

type Payments = {
  [key: string]: number;
};

type Problem = {
  goods: string[];
  free_disposal: boolean;
  bidders: Bidder[];
};

export type Result = {
  rule: string;
  surplus: number;
  surplus_shares: Payments;
  payments: Payments;
  problem: Problem;
};
