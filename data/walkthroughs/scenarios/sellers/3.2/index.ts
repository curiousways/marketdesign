import { GetWalkthroughScenario } from '@/types/walkthrough';
import { sidebarContentStage1 } from './sidebar-content/1';
import { sidebarContentStage8 } from './sidebar-content/8';
import { sidebarContentStage9 } from './sidebar-content/9';

export const getSellerScenario3_2: GetWalkthroughScenario = (
  stage: number,
) => ({
  myProjects: [
    {
      title: 'My Project',
      cost: 100000,
      accepted: () => true,
      discountOrBonus: 37000,
      products: { biodiversity: 1, nutrients: 2 },
    },
  ],
  buyerProjects: [
    {
      title: 'Buyer 1',
      cost: 350000,
      accepted: () => true,
      discountOrBonus: 53000,
      products: { biodiversity: 6, nutrients: 8 },
    },
    {
      title: 'Buyer 2',
      cost: 280000,
      accepted: () => true,
      discountOrBonus: 116000,
      products: { biodiversity: 3, nutrients: 4 },
    },
    {
      title: 'Buyer 3',
      cost: 120000,
      accepted: () => true,
      discountOrBonus: 73000,
      products: { biodiversity: 3, nutrients: 0 },
    },
  ],
  sellerProjects: [
    {
      title: 'Seller 1',
      cost: 120000,
      accepted: () => true,
      discountOrBonus: 110000,
      products: { biodiversity: 7, nutrients: 6 },
    },
    {
      title: 'Seller 2',
      cost: 80000,
      accepted: () => true,
      discountOrBonus: 86000,
      products: { biodiversity: 5, nutrients: 4 },
    },
  ],
  sidebarContent: {
    1: sidebarContentStage1,
    8: sidebarContentStage8,
    9: sidebarContentStage9,
  },
  options: {
    stages: 9,
    isFormEnabled: stage === 1,
    showDetailsWidget: stage >= 1,
    showCosts: stage >= 1,
    showMaps: false,
    showParticipants: stage >= 1,
  },
});
