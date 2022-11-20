import { Walkthrough } from '@/types/walkthrough';
import { getBuyerScenario1_1 } from './1.1';
import { getBuyerScenario1_2 } from './1.2';
import { getBuyerScenario1_3 } from './1.3';
import { getBuyerScenario1_4 } from './1.4';
import { getBuyerScenario2_1 } from './2.1';
import { getBuyerScenario2_2 } from './2.2';
import { getBuyerScenario2_3 } from './2.3';
import { getBuyerScenario3_1 } from './3.1';
import { getBuyerScenario3_2 } from './3.2';
import { getBuyerScenario4_1 } from './4.1';
import { getBuyerScenario4_2 } from './4.2';
import { getBuyerScenario5_1 } from './5.1';
import { getBuyerScenario5_2 } from './5.2';

export const buyerWalkthroughs: Walkthrough[] = [
  {
    title: 'Bidding High & Low',
    scenarios: [
      getBuyerScenario1_1,
      getBuyerScenario1_2,
      getBuyerScenario1_3,
      getBuyerScenario1_4,
    ],
  },
  {
    title: 'Competition',
    scenarios: [getBuyerScenario2_1, getBuyerScenario2_2, getBuyerScenario2_3],
  },
  {
    title: 'Goodness of Fit',
    scenarios: [getBuyerScenario3_1, getBuyerScenario3_2],
  },
  {
    title: 'Splitting Bids & Divisible Bidding',
    scenarios: [getBuyerScenario4_1, getBuyerScenario4_2],
  },
  {
    title: 'Investor Bidding',
    scenarios: [getBuyerScenario5_1, getBuyerScenario5_2],
  },
];
