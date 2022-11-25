import { Project } from './project';
import { RoleId } from './roles';

export interface WalkthroughHighlightedMapRegions {
  buyer?: number;
  seller?: number;
}

export interface WalkthroughOptions {
  stages: number;
  isFormEnabled: boolean;
  allowDivision?: boolean;
  showDetailsWidget: boolean;
  showDivisibleInput?: boolean;
  showCosts: boolean;
  showMaps: boolean;
  highlightedMapRegions?: WalkthroughHighlightedMapRegions;
  showParticipants: boolean;
}

export type WalkthroughProject = Project & {
  accepted: (value: number) => boolean | number;
  discountOrBonus: number;
};

export type WalkthroughUserProject = WalkthroughProject & {
  bid?: number;
};

export interface WalkthroughScenario {
  myProjects: WalkthroughUserProject[];
  buyerProjects: WalkthroughProject[];
  sellerProjects: WalkthroughProject[];
  sidebarContent?: {
    [key: number]: JSX.Element;
  };
  options: WalkthroughOptions;
  fixedMarketState?: WalkthroughMarketState;
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
