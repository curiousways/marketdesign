import { GetWalkthroughScenario } from '@/types/walkthrough';
import { sidebarContentStage1 } from './sidebar-content/1';
import { sidebarContentStage8 } from './sidebar-content/8';
import { sidebarContentStage9 } from './sidebar-content/9';

export const getSellerScenario4_3: GetWalkthroughScenario = (
  stage: number,
) => ({
  myProjects: [
    {
      title: 'My Project',
      subtitle: 'Project 1',
      cost: 140000,
      discountOrBonus: 0,
      accepted: () => false,
      products: { biodiversity: 4, nutrients: 1 },
      mapRegions: ['s1'],
    },
    {
      title: 'My Project',
      subtitle: 'Project 2',
      cost: 180000,
      discountOrBonus: 73000,
      accepted: () => true,
      products: { biodiversity: 2, nutrients: 5 },
      mapRegions: ['s1'],
    },
  ],
  buyerProjects: [
    {
      title: 'Buyer 1',
      cost: 220000,
      accepted: () => true,
      discountOrBonus: 50000,
      products: { biodiversity: 1, nutrients: 4 },
    },
    {
      title: 'Buyer 2',
      cost: 120000,
      accepted: () => false,
      discountOrBonus: 0,
      products: { biodiversity: 3, nutrients: 0 },
    },
    {
      title: 'Buyer 3',
      cost: 100000,
      accepted: () => true,
      discountOrBonus: 40000,
      products: { biodiversity: 1, nutrients: 1 },
    },
  ],
  sellerProjects: [
    {
      title: 'Seller 1',
      cost: 90000,
      accepted: () => false,
      discountOrBonus: 0,
      products: { biodiversity: 1, nutrients: 3 },
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
    showMaps: false,
    showParticipants: stage >= 1,
  },
});
