import { GetWalkthroughScenario } from '@/types/walkthrough';
import { sidebarContentStage1 } from './sidebar-content/1';
import { sidebarContentStage8 } from './sidebar-content/8';
import { sidebarContentStage9 } from './sidebar-content/9';

export const getSellerScenario2_3: GetWalkthroughScenario = (
  stage: number,
) => ({
  myProjects: [
    {
      title: 'My Project',
      cost: 140000,
      accepted: () => true,
      discountOrBonus: 130000,
      products: { biodiversity: 4, nutrients: 3 },
    },
  ],
  buyerProjects: [
    {
      title: 'Buyer 1',
      cost: 240000,
      accepted: () => false,
      discountOrBonus: 0,
      products: { biodiversity: 3, nutrients: 1 },
    },
    {
      title: 'Buyer 2',
      cost: 260000,
      accepted: () => false,
      discountOrBonus: 0,
      products: { biodiversity: 4, nutrients: 2 },
    },
    {
      title: 'Buyer 3',
      cost: 280000,
      accepted: () => true,
      discountOrBonus: 10000,
      products: { biodiversity: 3, nutrients: 3 },
    },
  ],
  sellerProjects: [],
  sidebarContent: {
    1: sidebarContentStage1,
    8: sidebarContentStage8,
    9: sidebarContentStage9,
  },
  options: {
    stages: 9,
    setMyPrice: stage >= 1,
    isFormEnabled: stage === 1,
    showDetailsWidget: stage >= 1,
    showCosts: stage >= 1,
    showMaps: false,
    showParticipants: stage >= 1,
  },
});
