import { GetWalkthroughScenario } from "@/types/walkthrough";
import { sidebarContent1 } from "./sidebar-content/1";
import { sidebarContent10 } from "./sidebar-content/10";
import { sidebarContent2 } from "./sidebar-content/2";
import { sidebarContent3 } from "./sidebar-content/3";

export const getBuyerScenario3_1: GetWalkthroughScenario = (stage: number) => ({
  myProjects: [
    {
      title: 'My Project',
      cost: 60000,
      accepted: () => false,
      discountOrBonus: 0,
      products: { biodiversity: 1, nutrients: 2 }
    },
  ],
  buyerProjects: [
    {
      title: 'Buyer 1',
      cost: 200000,
      accepted: () => false,
      discountOrBonus: 0,
      products: { biodiversity: 5, nutrients: 2 }
    },
    {
      title: 'Buyer 2',
      cost: 300000,
      accepted: () => true,
      discountOrBonus: 50000,
      products: { biodiversity: 4, nutrients: 7 }
    }
  ],
  sellerProjects: [
    {
      title: 'Seller 1',
      cost: 100000,
      accepted: () => false,
      discountOrBonus: 0,
      products: { biodiversity: 1, nutrients: 2 }
    },
    {
      title: 'Seller 2',
      cost: 150000,
      accepted: () => true,
      discountOrBonus: 100000,
      products: { biodiversity: 6, nutrients: 7 }
    },
    {
      title: 'Seller 3',
      cost: 210000,
      accepted: () => false,
      discountOrBonus: 0,
      products: { biodiversity: 4, nutrients: 4 }
    }
  ],
  sidebarContent: {
    1: sidebarContent1,
    2: sidebarContent2,
    3: sidebarContent3,
    10: sidebarContent10,
  },
  options: {
    stages: 10,
    setMyPrice: stage >= 3,
    isFormEnabled: stage === 3,
    showDetailsWidget: stage >= 2,
    showCosts: stage >= 3,
    showMaps: true,
    showParticipants: stage >= 3,
  }
});
