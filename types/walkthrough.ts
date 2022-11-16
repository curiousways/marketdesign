import { RoleId } from "./roles";

export interface WalkthroughOptions {
  stages: number;
  set_my_price: number;
  allow_button_click: number;
  allow_division?: boolean,
  show_products_quantity?: number;
  show_calculating_overlay: number[];
  show_details_widget: number;
  show_divisible_input?: boolean;
  show_solve_market: number;
  show_market_outcome: number;
  show_calculating_winners: number;
  show_distributing_surplus: number;
  show_calculating_final: number;
  show_surpluses: number;
  show_final_payments: number;
  show_balanced_market: number;
  show_bids: number;
  show_offers: number;
  show_maps: boolean;
  show_full_map: number;
  show_highlighted_map: number;
  show_participants: number;
  hide_next_button: number[];
  hide_prev_button: number[];
  show_losers: number;
  highlight_me: number;
};

export interface Products {
  biodiversity: number;
  nutrients: number;
}

export interface WalkthroughProject {
  title: string;
  subtitle?: string;
  cost: number;
  accepted: boolean | number,
  isMyProject?: boolean;
  isInactive?: boolean;
  discountOrBonus: number;
  products: Products;
}

export interface WalkthroughScenario {
  myProjects: [WalkthroughProject, ...WalkthroughProject[]]; // One or more
  buyerProjects: WalkthroughProject[];
  sellerProjects: WalkthroughProject[];
  sidebarContent?: {
    [key: number]: JSX.Element;
  },
  options: WalkthroughOptions;
}

export interface Walkthrough {
  title: string;
  scenarios: WalkthroughScenario[];
}

export type WalkthroughsByRole = {
  roleId: RoleId;
  walkthroughs: Walkthrough[];
}[];
