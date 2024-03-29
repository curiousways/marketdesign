import { GetWalkthroughScenario } from '@/types/walkthrough';
import { sidebarContent1 } from './sidebar-content/1';
import { sidebarContent12 } from './sidebar-content/12';
import { sidebarContent2 } from './sidebar-content/2';
import { sidebarContent3 } from './sidebar-content/3';
import { sidebarContent4 } from './sidebar-content/4';
import { sidebarContent5 } from './sidebar-content/5';
import { sidebarContent6 } from './sidebar-content/6';

const HIGHLIGHTED_MAP_REGION = 'b1';

export const getBuyerScenario1_1: GetWalkthroughScenario = (stage: number) => ({
  myProjects: [
    {
      title: 'My Project',
      cost: 120000,
      discountOrBonus: 12500,
      accepted: () => true,
      products: { biodiversity: 1, nutrients: 3 },
      mapRegions: [HIGHLIGHTED_MAP_REGION],
    },
  ],
  buyerProjects: [
    {
      title: 'Buyer 1',
      cost: 100000,
      discountOrBonus: 7500,
      accepted: () => true,
      products: { biodiversity: 2, nutrients: 2 },
    },
    {
      title: 'Buyer 2',
      cost: 110000,
      discountOrBonus: 0,
      accepted: () => false,
      products: { biodiversity: 3, nutrients: 0 },
    },
  ],
  sellerProjects: [
    {
      title: 'Seller 1',
      cost: 120000,
      discountOrBonus: 25000,
      accepted: () => false,
      products: { biodiversity: 3, nutrients: 1 },
    },
    {
      title: 'Seller 2',
      cost: 80000,
      discountOrBonus: 7500,
      accepted: () => true,
      products: { biodiversity: 2, nutrients: 1 },
    },
    {
      title: 'Seller 3',
      cost: 100000,
      discountOrBonus: 12500,
      accepted: () => true,
      products: { biodiversity: 1, nutrients: 4 },
    },
  ],
  sidebarContent: {
    1: sidebarContent1,
    2: sidebarContent2,
    3: sidebarContent3,
    4: sidebarContent4,
    5: sidebarContent5,
    6: sidebarContent6,
    12: sidebarContent12,
  },
  options: {
    stages: 12,
    isFormEnabled: stage === 5,
    showDetailsWidget: stage >= 2,
    showMaps: true,
    highlightedMapRegions: {
      buyer: stage >= 2 ? [HIGHLIGHTED_MAP_REGION] : undefined,
    },
    showParticipants: stage >= 3,
  },
});
