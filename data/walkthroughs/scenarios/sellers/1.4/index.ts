import { GetWalkthroughScenario } from "@/types/walkthrough";
import { sidebarContent1 } from "./sidebar-content/1";
import { sidebarContent8 } from "./sidebar-content/8";
import { sidebarContent9 } from "./sidebar-content/9";

export const getSellerScenario1_4: GetWalkthroughScenario = (stage: number) => ({
  myProjects: [
    {
      title: 'My Project',
      cost: [60000, 80000, 100000],
      discountOrBonus: 12000,
      accepted: (value: number) => value === 60000,
      products: { biodiversity: 2, nutrients: 3 },
    },
  ],
  buyerProjects: [
    {
      title: 'Buyer 1',
      cost: 120000,
      accepted: () => false,
      discountOrBonus: 0,
      products: { biodiversity: 3, nutrients: 4 }
    },
    {
      title: 'Buyer 2',
      cost: 180000,
      accepted: () => true,
      discountOrBonus: 37500,
      products: { biodiversity: 3, nutrients: 2 }
    },
    {
      title: 'Buyer 3',
      cost: 70000,
      accepted: () => true,
      discountOrBonus: 4000,
      products: { biodiversity: 1, nutrients: 3 }
    },
  ],
  sellerProjects: [
    {
      title: 'Seller 1',
      cost: 120000,
      accepted: () => true,
      discountOrBonus: 16000,
      products: { biodiversity: 4, nutrients: 2 }
    },
    {
      title: 'Seller 2',
      cost: 70000,
      accepted: () => false,
      discountOrBonus: 0,
      products: { biodiversity: 1, nutrients: 3 }
    },
  ],
  sidebarContent: {
    1: sidebarContent1,
    8: sidebarContent8,
    9: sidebarContent9,
  },
  options: {
    stages: 9,
    setMyPrice: stage >= 1,
    isFormEnabled: stage === 1,
    showDetailsWidget: stage >= 1,
    showCosts: stage >= 3,
    showMaps: false,
    showParticipants: stage >= 1,
  }
});
