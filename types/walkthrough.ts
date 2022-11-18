import { RoleId } from "./roles";

export interface WalkthroughOptions {
  stages: number;
  setMyPrice: boolean;
  isFormEnabled: boolean;
  allowDivision?: boolean,
  showDetailsWidget: boolean;
  showDivisibleInput?: boolean;
  showCosts: boolean;
  showMaps: boolean;
  showParticipants: boolean;
};

export interface Products {
  biodiversity?: number;
  nutrients?: number;
}

export interface WalkthroughProject {
  title: string;
  subtitle?: string;
  cost: number | number[];
  accepted: (value: number) => boolean | number,
  isInactive?: boolean;
  discountOrBonus: number;
  products: Products;
  costPerCredit?: number;
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

export type GetWalkthroughScenario = (stage: number) => WalkthroughScenario;

export interface Walkthrough {
  title: string;
  scenarios: GetWalkthroughScenario[];
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
