import { GetWalkthroughScenario } from '@/types/walkthrough';
import { sidebarContentStage1 } from './sidebar-content/1';
import { sidebarContentStage2 } from './sidebar-content/2';
import { sidebarContentStage9 } from './sidebar-content/9';
import { sidebarContentStage10 } from './sidebar-content/10';

export const getSellerScenario5_2: GetWalkthroughScenario = (
  stage: number,
) => ({
  myProjects: [
    {
      title: 'My Project',
      subtitle: 'Field 1',
      cost: 140000,
      discountOrBonus: 0,
      accepted: () => false,
      products: { biodiversity: 4, nutrients: 1 },
    },
    {
      title: 'My Project',
      subtitle: 'Field 2',
      cost: 70000,
      discountOrBonus: 0,
      accepted: () => false,
      products: { biodiversity: 1, nutrients: 2 },
    },
    {
      title: 'My Project',
      subtitle: 'Field 1 & 2',
      cost: 170000,
      discountOrBonus: 42000,
      accepted: () => true,
      products: { biodiversity: 5, nutrients: 3 },
    },
  ],
  buyerProjects: [
    {
      title: 'Buyer 1',
      cost: 270000,
      accepted: () => true,
      discountOrBonus: 42000,
      products: { biodiversity: 1, nutrients: 4 },
    },
    {
      title: 'Buyer 2',
      cost: 120000,
      accepted: () => true,
      discountOrBonus: 5000,
      products: { biodiversity: 3, nutrients: 0 },
    },
  ],
  sellerProjects: [
    {
      title: 'Seller 1',
      cost: 90000,
      accepted: () => true,
      discountOrBonus: 42000,
      products: { biodiversity: 1, nutrients: 2 },
    },
  ],
  sidebarContent: {
    1: sidebarContentStage1,
    2: sidebarContentStage2,
    9: sidebarContentStage9,
    10: sidebarContentStage10,
  },
  options: {
    stages: 10,
    isFormEnabled: stage === 2,
    showDetailsWidget: stage >= 1,
    showMaps: false,
    showParticipants: stage >= 1,
  },
});
