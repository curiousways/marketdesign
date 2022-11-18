import { sidebarContentStage1 } from "./sidebar-content/1";
import { sidebarContentStage2 } from "./sidebar-content/2";
import { sidebarContentStage3 } from "./sidebar-content/3";
import { sidebarContentStage10 } from "./sidebar-content/10";
import { GetWalkthroughScenario } from "@/types/walkthrough";

export const getSellerScenario2_1: GetWalkthroughScenario = (stage: number) => ({
  myProjects: [
    {
      title: 'My Project',
      cost: 140000,
      accepted: () => true,
      discountOrBonus: 84000,
      products: { biodiversity: 4, nutrients: 3 }
    },
  ],
  buyerProjects: [
    {
      title: 'Buyer 1',
      cost: 240000,
      accepted: () => true,
      discountOrBonus: 61000,
      products: { biodiversity: 3, nutrients: 1 }
    },
    {
      title: 'Buyer 2',
      cost: 260000,
      accepted: () => true,
      discountOrBonus: 45000,
      products: { biodiversity: 4, nutrients: 2 }
    },
    {
      title: 'Buyer 3',
      cost: 280000,
      accepted: () => true,
      discountOrBonus: 72000,
      products: { biodiversity: 3, nutrients: 3 }
    }
  ],
  sellerProjects: [
    {
      title: 'Seller 1',
      cost: 120000,
      accepted: () => true,
      discountOrBonus: 53000,
      products: { biodiversity: 3, nutrients: 2 }
    },
    {
      title: 'Seller 2',
      cost: 160000,
      accepted: () => true,
      discountOrBonus: 45000,
      products: { biodiversity: 3, nutrients: 3 }
    }
  ],
  sidebarContent: {
    1: sidebarContentStage1,
    2: sidebarContentStage2,
    3: sidebarContentStage3,
    10: sidebarContentStage10,
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
