import { GetWalkthroughScenario } from '@/types/walkthrough';
import { sidebarContent1 } from './sidebar-content/1';
import { sidebarContent8 } from './sidebar-content/8';
import { sidebarContent9 } from './sidebar-content/9';

const SIXTY_THOUSAND = 60000;
const EIGHTY_THOUSAND = 80000;
const ONE_HUNDRED_THOUSAND = 100000;

const myProject = {
  title: 'My Project',
  cost: [SIXTY_THOUSAND, EIGHTY_THOUSAND, ONE_HUNDRED_THOUSAND],
  discountOrBonus: 12000,
  accepted: (value: number) => value === 60000,
  products: { biodiversity: 2, nutrients: 3 },
  mapRegions: ['s1'],
};

export const getSellerScenario1_4: GetWalkthroughScenario = (
  stage: number,
  { getProjectCost } = {},
) => {
  if (!getProjectCost) {
    throw new Error(
      'This scenario requires a getProjectCost function to be given',
    );
  }

  const projectCost = getProjectCost(myProject);

  return {
    myProjects: [myProject],
    buyerProjects: [
      {
        title: 'Buyer 1',
        cost: 120000,
        accepted: () => false,
        discountOrBonus: 0,
        products: { biodiversity: 3, nutrients: 4 },
      },
      {
        title: 'Buyer 2',
        cost: 180000,
        accepted: () => true,
        discountOrBonus: (() => {
          if (projectCost === ONE_HUNDRED_THOUSAND) {
            return 35000;
          }

          if (projectCost === EIGHTY_THOUSAND) {
            return 35000;
          }

          return 38000;
        })(),
        products: { biodiversity: 3, nutrients: 2 },
      },
      {
        title: 'Buyer 3',
        cost: 70000,
        accepted: () => projectCost !== ONE_HUNDRED_THOUSAND,
        discountOrBonus: (() => {
          if (projectCost === SIXTY_THOUSAND) {
            return 4000;
          }

          return 0;
        })(),
        products: { biodiversity: 1, nutrients: 3 },
      },
    ],
    sellerProjects: [
      {
        title: 'Seller 1',
        cost: 120000,
        accepted: () => true,
        discountOrBonus: (() => {
          if (projectCost === ONE_HUNDRED_THOUSAND) {
            return 25000;
          }

          if (projectCost === EIGHTY_THOUSAND) {
            return 20000;
          }

          return 16000;
        })(),
        products: { biodiversity: 4, nutrients: 2 },
      },
      {
        title: 'Seller 2',
        cost: 70000,
        accepted: () => projectCost === EIGHTY_THOUSAND,
        discountOrBonus: 5000,
        products: { biodiversity: 1, nutrients: 3 },
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
      limitMarketInfo: true,
    },
  };
};
