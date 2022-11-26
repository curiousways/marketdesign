import { GetWalkthroughScenario } from '@/types/walkthrough';
import { sidebarContent1 } from './sidebar-content/1';
import { sidebarContent8 } from './sidebar-content/8';
import { sidebarContent9 } from './sidebar-content/9';

export const getBuyerScenario1_4: GetWalkthroughScenario = (stage: number) => ({
  myProjects: [
    {
      title: 'My Project',
      cost: [120000, 100000, 80000],
      discountOrBonus: 5000,
      accepted: (value: number) => value === 120000,
      products: { biodiversity: 1, nutrients: 3 },
    },
  ],
  buyerProjects: [
    {
      title: 'Buyer 1',
      cost: 120000,
      accepted: () => true,
      discountOrBonus: 2500,
      products: { biodiversity: 3, nutrients: 1 },
    },
    {
      title: 'Buyer 2',
      cost: 140000,
      accepted: () => true,
      discountOrBonus: 2500,
      products: { biodiversity: 2, nutrients: 2 },
    },
  ],
  sellerProjects: [
    {
      title: 'Seller 1',
      cost: 160000,
      accepted: () => true,
      discountOrBonus: 2500,
      products: { biodiversity: 5, nutrients: 2 },
    },
    {
      title: 'Seller 2',
      cost: 40000,
      accepted: () => true,
      discountOrBonus: 2500,
      products: { biodiversity: 1, nutrients: 2 },
    },
    {
      title: 'Seller 3',
      cost: 100000,
      accepted: () => true,
      discountOrBonus: 0,
      products: { biodiversity: 0, nutrients: 2 },
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
