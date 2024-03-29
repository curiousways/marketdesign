import { GetWalkthroughScenario } from '@/types/walkthrough';
import { sidebarContent1 } from './sidebar-content/1';
import { sidebarContent10 } from './sidebar-content/10';
import { sidebarContent2 } from './sidebar-content/2';
import { sidebarContent3 } from './sidebar-content/3';
import { sidebarContent4 } from './sidebar-content/4';

const HIGHLIGHTED_MAP_REGION = 'b1';

export const getBuyerScenario4_1: GetWalkthroughScenario = (stage: number) => ({
  myProjects: [
    {
      title: 'My Project',
      cost: 180000,
      // The number below is so specific because we wanted specifically 120,000
      // to be accepted (67% of 180,000 is actually 120,600).
      accepted: () => 66.666666667,
      discountOrBonus: 19000,
      products: { biodiversity: 3, nutrients: 6 },
      mapRegions: [HIGHLIGHTED_MAP_REGION],
    },
  ],
  buyerProjects: [
    {
      title: 'Buyer 1',
      cost: 100000,
      accepted: () => true,
      discountOrBonus: 58000,
      products: { biodiversity: 2, nutrients: 1 },
    },
    {
      title: 'Buyer 2',
      cost: 130000,
      accepted: () => true,
      discountOrBonus: 43000,
      products: { biodiversity: 1, nutrients: 3 },
    },
  ],
  sellerProjects: [
    {
      title: 'Seller 1',
      cost: 60000,
      accepted: () => false,
      discountOrBonus: 25000,
      products: { biodiversity: 3, nutrients: 1 },
    },
    {
      title: 'Seller 2',
      cost: 100000,
      accepted: () => true,
      discountOrBonus: 20000,
      products: { biodiversity: 4, nutrients: 4 },
    },
    {
      title: 'Seller 3',
      cost: 80000,
      accepted: () => true,
      discountOrBonus: 30000,
      products: { biodiversity: 3, nutrients: 4 },
    },
  ],
  sidebarContent: {
    1: sidebarContent1,
    2: sidebarContent2,
    3: sidebarContent3,
    4: sidebarContent4,
    10: sidebarContent10,
  },
  options: {
    stages: 10,
    isFormEnabled: stage === 3,
    allowDivision: true,
    showDetailsWidget: stage >= 2,
    showDivisibleInput: true,
    showMaps: true,
    highlightedMapRegions: {
      buyer: stage >= 2 ? [HIGHLIGHTED_MAP_REGION] : undefined,
    },
    showParticipants: stage >= 3,
  },
});
