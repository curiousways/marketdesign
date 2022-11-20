import { sidebarContentStage1 } from "./sidebar-content/1";
import { sidebarContentStage2 } from "./sidebar-content/2";
import { sidebarContentStage3 } from "./sidebar-content/3";
import { sidebarContentStage4 } from "./sidebar-content/4";
import { GetWalkthroughScenario } from "@/types/walkthrough";
import { sidebarContentStage10 } from "./sidebar-content/10";
import { sidebarContentStage11 } from "./sidebar-content/11";

export const getBuyerScenario5_1: GetWalkthroughScenario = (stage: number) => ({
  myProjects: [
    {
      title: 'My Project',
      subtitle: 'Biodiversity',
      cost: 80000,
      accepted: () => 75,
      discountOrBonus: 17000,
      products: { biodiversity: 4 },
      costPerCredit: 20000,
    },
    {
      title: 'My Project',
      subtitle: 'Water Quality',
      cost: 30000,
      accepted: () => 50,
      discountOrBonus: 5000,
      products: { nutrients: 2 },
      costPerCredit: 15000,
    },
  ],
  buyerProjects: [
    {
      title: 'Buyer 1',
      cost: 140000,
      accepted: () => true,
      discountOrBonus: 57000,
      products: { biodiversity: 1, nutrients: 3 },
    },
  ],
  sellerProjects: [
    {
      title: 'Seller 1',
      cost: 50000,
      accepted: () => true,
      discountOrBonus: 4000,
      products: { biodiversity: 3, nutrients: 0 },
    },
    {
      title: 'Seller 2',
      cost: 140000,
      accepted: () => false,
      discountOrBonus: 0,
      products: { biodiversity: 4, nutrients: 4 },
    },
    {
      title: 'Seller 3',
      cost: 60000,
      accepted: () => true,
      discountOrBonus: 22000,
      products: { biodiversity: 1, nutrients: 4 },
    },
  ],
  sidebarContent: {
    1: sidebarContentStage1,
    2: sidebarContentStage2,
    3: sidebarContentStage3,
    4: sidebarContentStage4,
    10: sidebarContentStage10,
    11: sidebarContentStage11,
  },
  options: {
    stages: 11,
    isFormEnabled: stage === 3,
    showDetailsWidget: stage >= 2,
    showCosts: stage >= 3,
    showMaps: true,
    showParticipants: stage >= 3,
  },
});
