import { GetWalkthroughScenario } from '@/types/walkthrough';
import { sidebarContentStage1 } from './sidebar-content/1';
import { sidebarContentStage8 } from './sidebar-content/8';

export const getSellerScenario1_2: GetWalkthroughScenario = (
  stage: number,
) => ({
  myProjects: [
    {
      title: 'My Project',
      cost: 60000,
      fixedBid: 80000,
      accepted: () => true,
      discountOrBonus: 17000,
      products: { biodiversity: 2, nutrients: 3 },
      mapRegions: ['s1'],
    },
  ],
  buyerProjects: [
    {
      title: 'Buyer 1',
      cost: 200000,
      accepted: () => true,
      discountOrBonus: 58000,
      products: { biodiversity: 1, nutrients: 4 },
    },
    {
      title: 'Buyer 2',
      cost: 100000,
      accepted: () => true,
      discountOrBonus: 63000,
      products: { biodiversity: 0, nutrients: 2 },
    },
    {
      title: 'Buyer 3',
      cost: 120000,
      accepted: () => false,
      discountOrBonus: 0,
      products: { biodiversity: 4, nutrients: 0 },
    },
  ],
  sellerProjects: [
    {
      title: 'Seller 1',
      cost: 120000,
      accepted: () => false,
      discountOrBonus: 0,
      products: { biodiversity: 5, nutrients: 2 },
    },
    {
      title: 'Seller 2',
      cost: 50000,
      accepted: () => true,
      discountOrBonus: 32000,
      products: { biodiversity: 0, nutrients: 3 },
    },
  ],
  sidebarContent: {
    1: sidebarContentStage1,
    8: sidebarContentStage8,
  },
  options: {
    stages: 8,
    isFormEnabled: stage === 1,
    showDetailsWidget: stage >= 1,
    showMaps: false,
    showParticipants: stage >= 1,
  },
});
