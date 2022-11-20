import { GetWalkthroughScenario } from '@/types/walkthrough';
import { sidebarContentStage1 } from './sidebar-content/1';
import { sidebarContentStage2 } from './sidebar-content/2';
import { sidebarContentStage3 } from './sidebar-content/3';
import { sidebarContentStage10 } from './sidebar-content/10';

export const getSellerScenario5_1: GetWalkthroughScenario = (
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
      discountOrBonus: 37000,
      accepted: () => true,
      products: { biodiversity: 1, nutrients: 2 },
    },
  ],
  buyerProjects: [
    {
      title: 'Buyer 1',
      cost: 270000,
      accepted: () => true,
      discountOrBonus: 37000,
      products: { biodiversity: 1, nutrients: 4 },
    },
    {
      title: 'Buyer 2',
      cost: 120000,
      accepted: () => false,
      discountOrBonus: 0,
      products: { biodiversity: 3, nutrients: 0 },
    },
  ],
  sellerProjects: [
    {
      title: 'Seller 1',
      cost: 90000,
      accepted: () => true,
      discountOrBonus: 37000,
      products: { biodiversity: 1, nutrients: 2 },
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
    setMyPrice: stage >= 3,
    isFormEnabled: stage === 3,
    showDetailsWidget: stage >= 2,
    showCosts: stage >= 3,
    showMaps: true,
    highlightedMapRegions: {
      seller: stage >= 2 ? 3 : -1,
    },
    showParticipants: stage >= 3,
  },
});
