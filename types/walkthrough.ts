import { HighlightedMapRegions } from './map';
import { MarketState } from './market';
import { Project } from './project';
import { RoleId } from './roles';

export interface WalkthroughOptions {
  stages: number;
  isFormEnabled: boolean;
  allowDivision?: boolean;
  showDetailsWidget: boolean;
  showDivisibleInput?: boolean;
  showMaps: boolean;
  highlightedMapRegions?: HighlightedMapRegions;
  showParticipants: boolean;
}

export interface WalkthroughScenario {
  myProjects: Project[];
  buyerProjects: Project[];
  sellerProjects: Project[];
  sidebarContent?: {
    [key: number]: JSX.Element;
  };
  options: WalkthroughOptions;
  fixedMarketState?: MarketState;
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
