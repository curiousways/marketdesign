import { GetWalkthroughScenario } from '@/types/walkthrough';
import { sidebarContent1 } from './sidebar-content/1';
import { sidebarContent10 } from './sidebar-content/10';
import { sidebarContent2 } from './sidebar-content/2';
import { sidebarContent3 } from './sidebar-content/3';

const HIGHLIGHTED_MAP_REGION = 'b1';

export const getBuyerScenario2_1: GetWalkthroughScenario = (stage: number) => ({
  myProjects: [
    {
      title: 'My Project',
      cost: 280000,
      accepted: () => true,
      discountOrBonus: 72000,
      products: { biodiversity: 3, nutrients: 3 },
      mapRegions: [HIGHLIGHTED_MAP_REGION],
    },
  ],
  buyerProjects: [
    {
      title: 'Buyer 1',
      cost: 240000,
      accepted: () => true,
      discountOrBonus: 61000,
      products: { biodiversity: 3, nutrients: 1 },
    },
    {
      title: 'Buyer 2',
      cost: 260000,
      accepted: () => true,
      discountOrBonus: 45000,
      products: { biodiversity: 4, nutrients: 2 },
    },
  ],
  sellerProjects: [
    {
      title: 'Seller 1',
      cost: 140000,
      accepted: () => true,
      discountOrBonus: 84000,
      products: { biodiversity: 4, nutrients: 3 },
    },
    {
      title: 'Seller 2',
      cost: 120000,
      accepted: () => true,
      discountOrBonus: 53000,
      products: { biodiversity: 3, nutrients: 2 },
    },
    {
      title: 'Seller 3',
      cost: 160000,
      accepted: () => true,
      discountOrBonus: 45000,
      products: { biodiversity: 3, nutrients: 3 },
    },
  ],
  sidebarContent: {
    1: sidebarContent1,
    2: sidebarContent2,
    3: sidebarContent3,
    10: sidebarContent10,
  },
  options: {
    stages: 10,
    isFormEnabled: stage === 3,
    showDetailsWidget: stage >= 2,
    showMaps: true,
    highlightedMapRegions: {
      buyer: stage >= 2 ? [HIGHLIGHTED_MAP_REGION] : undefined,
    },
    showParticipants: stage >= 3,
  },
});
