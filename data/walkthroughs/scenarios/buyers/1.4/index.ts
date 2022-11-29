import { GetWalkthroughScenario } from '@/types/walkthrough';
import { sidebarContent1 } from './sidebar-content/1';
import { sidebarContent8 } from './sidebar-content/8';
import { sidebarContent9 } from './sidebar-content/9';

const EIGHTY_THOUSAND = 80000;
const ONE_HUNDRED_THOUSAND = 100000;
const ONE_HUNDRED_TWENTY_THOUSAND = 120000;

const myProject = {
  title: 'My Project',
  cost: [EIGHTY_THOUSAND, ONE_HUNDRED_THOUSAND, ONE_HUNDRED_TWENTY_THOUSAND],
  discountOrBonus: 5000,
  accepted: (value: number) => value === 120000,
  products: { biodiversity: 1, nutrients: 3 },
  mapRegions: ['b1'],
};

export const getBuyerScenario1_4: GetWalkthroughScenario = (
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
        accepted: () => true,
        discountOrBonus: (() => {
          if (projectCost === ONE_HUNDRED_TWENTY_THOUSAND) {
            return 20000;
          }

          if (projectCost === ONE_HUNDRED_THOUSAND) {
            return 17000;
          }

          return 15000;
        })(),
        products: { biodiversity: 3, nutrients: 1 },
      },
      {
        title: 'Buyer 2',
        cost: 140000,
        accepted: () => true,
        discountOrBonus: (() => {
          if (
            projectCost === ONE_HUNDRED_TWENTY_THOUSAND ||
            projectCost === ONE_HUNDRED_THOUSAND
          ) {
            return 10000;
          }

          return 15000;
        })(),
        products: { biodiversity: 2, nutrients: 2 },
      },
    ],
    sellerProjects: [
      {
        title: 'Seller 1',
        cost: 160000,
        accepted: () => true,
        discountOrBonus: (() => {
          if (projectCost === ONE_HUNDRED_TWENTY_THOUSAND) {
            return 20000;
          }

          if (projectCost === ONE_HUNDRED_THOUSAND) {
            return 17000;
          }

          return 15000;
        })(),
        products: { biodiversity: 5, nutrients: 2 },
      },
      {
        title: 'Seller 2',
        cost: 40000,
        accepted: () => true,
        discountOrBonus: (() => {
          if (projectCost === ONE_HUNDRED_TWENTY_THOUSAND) {
            return 20000;
          }

          if (projectCost === ONE_HUNDRED_THOUSAND) {
            return 17000;
          }

          return 15000;
        })(),
        products: { biodiversity: 1, nutrients: 2 },
      },
      {
        title: 'Seller 3',
        cost: 100000,
        accepted: () => projectCost === ONE_HUNDRED_TWENTY_THOUSAND,
        discountOrBonus: (() => {
          if (projectCost === ONE_HUNDRED_TWENTY_THOUSAND) {
            return 3000;
          }

          return 0;
        })(),
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
  };
};
