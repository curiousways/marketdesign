import { GetWalkthroughScenario, WalkthroughProject } from "@/types/walkthrough";
import { sidebarContent1 } from "./sidebar-content/1";
import { sidebarContent12 } from "./sidebar-content/12";
import { sidebarContent2 } from "./sidebar-content/2";
import { sidebarContent3 } from "./sidebar-content/3";
import { sidebarContent4 } from "./sidebar-content/4";
import { sidebarContent5 } from "./sidebar-content/5";
import { sidebarContent6 } from "./sidebar-content/6";
import { sidebarContent7 } from "./sidebar-content/7";
import { sidebarContent8 } from "./sidebar-content/8";
import { sidebarContent9 } from "./sidebar-content/9";

const getBuyerProjects = (stage: number): WalkthroughProject[] => {
  if ([6, 7].includes(stage)) {
    return [
      {
        title: 'Buyer 1',
        cost: 200000,
        discountOrBonus: 0,
        accepted: () => false,
        products: { biodiversity: 1, nutrients: 2 }
      },
    ];
  }

  if ([8, 9].includes(stage)) {
    return [
      {
        title: 'Buyer 1',
        cost: 200000,
        discountOrBonus: 0,
        accepted: () => false,
        products: { biodiversity: 1, nutrients: 2 }
      },
      {
        title: 'Buyer 2',
        cost: 150000,
        discountOrBonus: 0,
        accepted: () => false,
        products: { biodiversity: 3, nutrients: 2 }
      },
    ];
  }

  return [];
};

const getSellerProjects = (stage: number): WalkthroughProject[] => {
  if ([4, 6, 7].includes(stage)) {
    return [
      {
        title: 'Seller 1',
        cost: 60000,
        discountOrBonus: 0,
        accepted: () => false,
        products: { biodiversity: 3, nutrients: 2 }
      },
    ];
  }

  if ([8, 9].includes(stage)) {
    return [
      {
        title: 'Seller 1',
        cost: 100000,
        discountOrBonus: 0,
        accepted: () => false,
        products: { biodiversity: 3, nutrients: 2 }
      },
      {
        title: 'Seller 2',
        cost: 130000,
        discountOrBonus: 0,
        accepted: () => false,
        products: { biodiversity: 4, nutrients: 5 }
      },
    ];
  }

  return [];
};

export const getGenericScenario0_0: GetWalkthroughScenario = (stage: number) => ({
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
    12: sidebarContent12,
  },
  options: {
    stages: 12,
    setMyPrice: false,
    isFormEnabled: false,
    showDetailsWidget: false,
    showCosts: true,
    showMaps: true,
    showParticipants: [4, 6, 7, 8, 9].includes(stage),
  },
});
