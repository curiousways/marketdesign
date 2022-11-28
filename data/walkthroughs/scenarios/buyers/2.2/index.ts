import { GetWalkthroughScenario } from '@/types/walkthrough';
import { sidebarContent1 } from './sidebar-content/1';
import { sidebarContent8 } from './sidebar-content/8';

export const getBuyerScenario2_2: GetWalkthroughScenario = (stage: number) => ({
  myProjects: [
    {
      title: 'My Project',
      cost: 280000,
      accepted: () => true,
      discountOrBonus: 10000,
      products: { biodiversity: 3, nutrients: 3 },
      mapRegions: ['b1'],
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
  ],
  sellerProjects: [
    {
      title: 'Seller 1',
      cost: 140000,
      accepted: () => true,
      discountOrBonus: 130000,
      products: { biodiversity: 4, nutrients: 3 },
    },
  ],
  sidebarContent: {
    1: sidebarContent1,
    8: sidebarContent8,
  },
  options: {
    stages: 8,
    isFormEnabled: stage === 1,
    showDetailsWidget: stage >= 1,
    showMaps: false,
    showParticipants: stage >= 1,
  },
});
