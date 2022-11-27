import {
  GetWalkthroughScenario,
  WalkthroughMarketState,
} from '@/types/walkthrough';
import { Project } from '../../../../../types/project';
import { sidebarContent1 } from './sidebar-content/1';
import { sidebarContent10 } from './sidebar-content/10';
import { sidebarContent11 } from './sidebar-content/11';
import { sidebarContent12 } from './sidebar-content/12';
import { sidebarContent13 } from './sidebar-content/13';
import { sidebarContent15 } from './sidebar-content/15';
import { sidebarContent16 } from './sidebar-content/16';
import { sidebarContent17 } from './sidebar-content/17';
import { sidebarContent19 } from './sidebar-content/19';
import { sidebarContent2 } from './sidebar-content/2';
import { sidebarContent21 } from './sidebar-content/21';
import { sidebarContent3 } from './sidebar-content/3';
import { sidebarContent4 } from './sidebar-content/4';
import { sidebarContent5 } from './sidebar-content/5';
import { sidebarContent6 } from './sidebar-content/6';
import { sidebarContent7 } from './sidebar-content/7';
import { sidebarContent8 } from './sidebar-content/8';
import { sidebarContent9 } from './sidebar-content/9';

const getBuyerProjects = (stage: number): Project[] => {
  if ([6, 7].includes(stage)) {
    return [
      {
        title: 'Buyer 1',
        cost: 200000,
        discountOrBonus: 0,
        accepted: () => false,
        products: { biodiversity: 1, nutrients: 2 },
      },
    ];
  }

  if ([8, 9, 10].includes(stage)) {
    return [
      {
        title: 'Buyer 1',
        cost: 200000,
        discountOrBonus: 0,
        accepted: () => false,
        products: { biodiversity: 1, nutrients: 2 },
      },
      {
        title: 'Buyer 2',
        cost: 150000,
        discountOrBonus: 0,
        accepted: () => true,
        products: { biodiversity: 3, nutrients: 2 },
      },
    ];
  }

  if ([11, 13].includes(stage)) {
    return [
      {
        title: 'Buyer 1',
        cost: 210000,
        discountOrBonus: 0,
        accepted: () => true,
        products: { biodiversity: 1, nutrients: 2 },
      },
      {
        title: 'Buyer 2',
        cost: 150000,
        discountOrBonus: 0,
        accepted: () => true,
        products: { biodiversity: 3, nutrients: 2 },
      },
    ];
  }

  if (stage >= 14) {
    return [
      {
        title: 'Buyer 1',
        cost: 210000,
        discountOrBonus: 143300,
        accepted: () => true,
        products: { biodiversity: 1, nutrients: 2 },
      },
      {
        title: 'Buyer 2',
        cost: 150000,
        discountOrBonus: 43300,
        accepted: () => true,
        products: { biodiversity: 3, nutrients: 2 },
      },
    ];
  }

  return [];
};

const getSellerProjects = (stage: number): Project[] => {
  if ([4, 6, 7].includes(stage)) {
    return [
      {
        title: 'Seller 1',
        cost: 60000,
        discountOrBonus: 0,
        accepted: () => false,
        products: { biodiversity: 3, nutrients: 2 },
      },
    ];
  }

  if ([8, 9, 10].includes(stage)) {
    return [
      {
        title: 'Seller 1',
        cost: 130000,
        discountOrBonus: 0,
        accepted: () => true,
        products: { biodiversity: 5, nutrients: 4 },
      },
      {
        title: 'Seller 2',
        cost: 100000,
        discountOrBonus: 0,
        accepted: () => false,
        products: { biodiversity: 3, nutrients: 2 },
      },
    ];
  }

  if ([11, 13].includes(stage)) {
    return [
      {
        title: 'Seller 1',
        cost: 130000,
        discountOrBonus: 0,
        accepted: () => true,
        products: { biodiversity: 5, nutrients: 4 },
      },
      {
        title: 'Seller 2',
        cost: 100000,
        discountOrBonus: 0,
        accepted: () => true,
        products: { biodiversity: 2, nutrients: 3 },
      },
    ];
  }

  if (stage >= 14) {
    return [
      {
        title: 'Seller 1',
        cost: 130000,
        discountOrBonus: 43500,
        accepted: () => true,
        products: { biodiversity: 5, nutrients: 4 },
      },
      {
        title: 'Seller 2',
        cost: 100000,
        discountOrBonus: 0,
        accepted: () => false,
        products: { biodiversity: 2, nutrients: 3 },
      },
    ];
  }

  return [];
};

const getMarketState = (stage: number): WalkthroughMarketState => {
  if (stage === 21) {
    return WalkthroughMarketState.solved;
  }

  if (stage === 20) {
    return WalkthroughMarketState.calculating_final_payments;
  }

  if (stage > 18) {
    return WalkthroughMarketState.showing_surpluses;
  }

  if (stage === 18) {
    return WalkthroughMarketState.distributing_surpluss;
  }

  if (stage >= 15) {
    return WalkthroughMarketState.showing_winners;
  }

  if (stage === 14) {
    return WalkthroughMarketState.calculating_winners;
  }

  if (stage === 13) {
    return WalkthroughMarketState.solvable;
  }

  if (stage >= 10) {
    return WalkthroughMarketState.showing_winners;
  }

  return WalkthroughMarketState.pending;
};

const getHighlightedMapRegions = (stage: number) => {
  if (stage === 3) {
    return {
      seller: 7,
    };
  }

  if (stage === 5) {
    return {
      seller: 7,
      buyer: 36,
    };
  }
};

export const getGenericScenario0_0: GetWalkthroughScenario = (
  stage: number,
) => ({
  myProjects: [],
  buyerProjects: getBuyerProjects(stage),
  sellerProjects: getSellerProjects(stage),
  sidebarContent: {
    1: sidebarContent1,
    2: sidebarContent2,
    3: sidebarContent3,
    4: sidebarContent4,
    5: sidebarContent5,
    6: sidebarContent6,
    7: sidebarContent7,
    8: sidebarContent8,
    9: sidebarContent9,
    10: sidebarContent10,
    11: sidebarContent11,
    12: sidebarContent12,
    13: sidebarContent13,
    15: sidebarContent15,
    16: sidebarContent16,
    17: sidebarContent17,
    19: sidebarContent19,
    21: sidebarContent21,
  },
  fixedMarketState: getMarketState(stage),
  options: {
    stages: 22,
    isFormEnabled: false,
    showDetailsWidget: false,
    showMaps: true,
    highlightedMapRegions: getHighlightedMapRegions(stage),
    showParticipants: stage === 4 || (stage > 5 && stage < 12) || stage >= 13,
  },
});
