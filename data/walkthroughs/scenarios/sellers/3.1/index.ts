import { GetWalkthroughScenario } from '@/types/walkthrough';
import { sidebarContentStage1 } from './sidebar-content/1';
import { sidebarContentStage2 } from './sidebar-content/2';
import { sidebarContentStage3 } from './sidebar-content/3';
import { sidebarContentStage10 } from './sidebar-content/10';

const HIGHLIGHTED_MAP_REGION = 's1';

export const getSellerScenario3_1: GetWalkthroughScenario = (
  stage: number,
) => ({
  myProjects: [
    {
      title: 'My Project',
      cost: 100000,
      accepted: () => false,
      discountOrBonus: 0,
      products: { biodiversity: 2, nutrients: 1 },
      mapRegions: [HIGHLIGHTED_MAP_REGION],
    },
  ],
  buyerProjects: [
    {
      title: 'Buyer 1',
      cost: 350000,
      accepted: () => false,
      discountOrBonus: 0,
      products: { biodiversity: 6, nutrients: 8 },
    },
    {
      title: 'Buyer 2',
      cost: 280000,
      accepted: () => true,
      discountOrBonus: 45000,
      products: { biodiversity: 4, nutrients: 4 },
    },
    {
      title: 'Buyer 3',
      cost: 120000,
      accepted: () => true,
      discountOrBonus: 72000,
      products: { biodiversity: 3, nutrients: 0 },
    },
  ],
  sellerProjects: [
    {
      title: 'Seller 1',
      cost: 120000,
      accepted: () => true,
      discountOrBonus: 53000,
      products: { biodiversity: 7, nutrients: 6 },
    },
    {
      title: 'Seller 2',
      cost: 80000,
      accepted: () => false,
      discountOrBonus: 0,
      products: { biodiversity: 5, nutrients: 4 },
    },
  ],
  sidebarContent: {
    1: sidebarContentStage1,
    2: sidebarContentStage2,
    3: sidebarContentStage3,
    10: sidebarContentStage10,
  },
  options: {
    stages: 10,
    isFormEnabled: stage === 3,
    showDetailsWidget: stage >= 2,
    showMaps: true,
    highlightedMapRegions: {
      seller: stage >= 2 ? [HIGHLIGHTED_MAP_REGION] : undefined,
    },
    showParticipants: stage >= 3,
  },
});
