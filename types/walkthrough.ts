import { MarketState } from './market';
import { MyProject, Project } from './project';
import { RoleId } from './roles';

export type WalkthroughHighlightedMapRegions = Partial<{
  [key in RoleId]: string[];
}>;

export interface WalkthroughOptions {
  stages: number;
  isFormEnabled: boolean;
  allowDivision?: boolean;
  showDetailsWidget: boolean;
  showDivisibleInput?: boolean;
  showMaps: boolean;
  highlightedMapRegions?: WalkthroughHighlightedMapRegions;
  projectOverlay?: {
    roleId: 'buyer' | 'seller';
    project: Project;
  };
  showParticipants: boolean;
  limitMarketInfo?: boolean;
}

export interface WalkthroughScenario {
  myProjects: MyProject[];
  buyerProjects: Project[];
  sellerProjects: Project[];
  sidebarContent?: {
    [key: number]: JSX.Element;
  };
  options: WalkthroughOptions;
  fixedMarketState?: MarketState;
}

export type GetWalkthroughScenario = (
  stage: number,
  options?: { getProjectCost?: (project: Project) => number },
) => WalkthroughScenario;

export interface Walkthrough {
  title: string;
  scenarios: GetWalkthroughScenario[];
}

export type WalkthroughsByRole = {
  roleId: RoleId;
  walkthroughs: Walkthrough[];
}[];
