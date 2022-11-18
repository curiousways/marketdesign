import { RoleId } from "./roles";

export interface WalkthroughOptions {
  stages: number;
  set_my_price: number;
  allow_button_click: number;
  allow_division?: boolean,
  show_details_widget: number;
  show_divisible_input?: boolean;
  show_costs: number;
  show_maps: boolean;
  show_participants: number;
};

export interface Products {
  biodiversity: number;
  nutrients: number;
}

export interface WalkthroughProject {
  title: string;
  subtitle?: string;
  cost: number | number[];
  accepted: (value: number) => boolean | number,
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

export enum WalkthroughMarketState {
  'pending',
  'solvable',
  'calculating_winners',
  'showing_winners',
  'distributing_surpluss',
  'showing_surpluses',
  'calculating_final_payments',
  'solved',
}
