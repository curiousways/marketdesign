import { Walkthrough } from '@/types/walkthrough';
import { getSellerScenario1_1 } from './1.1';
import { getSellerScenario1_2 } from './1.2';
import { getSellerScenario1_3 } from './1.3';
import { getSellerScenario1_4 } from './1.4';
import { getSellerScenario2_1 } from './2.1';
import { getSellerScenario2_2 } from './2.2';
import { getSellerScenario2_3 } from './2.3';
import { getSellerScenario3_1 } from './3.1';
import { getSellerScenario3_2 } from './3.2';
import { getSellerScenario4_1 } from './4.1';
import { getSellerScenario4_2 } from './4.2';
import { getSellerScenario4_3 } from './4.3';
import { getSellerScenario5_1 } from './5.1';
import { getSellerScenario5_2 } from './5.2';

export const sellerWalkthroughs: Walkthrough[] = [
  {
    title: 'Offering High & Low',
    scenarios: [
      getSellerScenario1_1,
      getSellerScenario1_2,
      getSellerScenario1_3,
      getSellerScenario1_4,
    ],
  },
  {
    title: 'Competition',
    scenarios: [
      getSellerScenario2_1,
      getSellerScenario2_2,
      getSellerScenario2_3,
    ],
  },
  {
    title: 'Goodness of Fit',
    scenarios: [getSellerScenario3_1, getSellerScenario3_2],
  },
  {
    title: 'Project Options for the Same Field',
    scenarios: [
      getSellerScenario4_1,
      getSellerScenario4_2,
      getSellerScenario4_3,
    ],
  },
  {
    title: 'Combination Offers for Multiple Projects',
    scenarios: [getSellerScenario5_1, getSellerScenario5_2],
  },
];
