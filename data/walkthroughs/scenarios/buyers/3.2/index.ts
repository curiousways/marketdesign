import { GetWalkthroughScenario } from '@/types/walkthrough';
import { sidebarContent1 } from './sidebar-content/1';
import { sidebarContent8 } from './sidebar-content/8';
import { sidebarContent9 } from './sidebar-content/9';

export const getBuyerScenario3_2: GetWalkthroughScenario = (stage: number) => ({
  myProjects: [
    {
      title: 'My Project',
      cost: 60000,
      accepted: () => true,
      discountOrBonus: 15000,
      products: { biodiversity: 2, nutrients: 1 },
    },
  ],
  buyerProjects: [
    {
      title: 'Buyer 1',
      cost: 200000,
      accepted: () => true,
      discountOrBonus: 23000,
      products: { biodiversity: 5, nutrients: 2 },
    },
    {
      title: 'Buyer 2',
      cost: 300000,
      accepted: () => true,
      discountOrBonus: 53000,
      products: { biodiversity: 4, nutrients: 7 },
    },
  ],
  sellerProjects: [
    {
      title: 'Seller 1',
      cost: 100000,
      accepted: () => false,
      discountOrBonus: 0,
      products: { biodiversity: 1, nutrients: 2 },
    },
    {
      title: 'Seller 2',
      cost: 150000,
      accepted: () => true,
      discountOrBonus: 98000,
      products: { biodiversity: 6, nutrients: 7 },
    },
    {
      title: 'Seller 3',
      cost: 210000,
      accepted: () => true,
      discountOrBonus: 10000,
      products: { biodiversity: 4, nutrients: 4 },
    },
  ],
  sidebarContent: {
    1: sidebarContent1,
    8: sidebarContent8,
    9: sidebarContent9,
  },
  options: {
    stages: 9,
    isFormEnabled: stage === 1,
    showDetailsWidget: stage >= 1,
    showMaps: false,
    showParticipants: stage >= 1,
  },
});
