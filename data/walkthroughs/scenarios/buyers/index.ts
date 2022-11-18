import { Walkthrough } from "@/types/walkthrough";
import { buyerScenario1_1 } from "./1.1";
import { buyerScenario1_2 } from "./1.2";
import { buyerScenario1_3 } from "./1.3";
import { buyerScenario1_4 } from "./1.4";
import { buyerScenario2_1 } from "./2.1";
import { buyerScenario2_2 } from "./2.2";
import { buyerScenario2_3 } from "./2.3";
import { buyerScenario3_1 } from "./3.1";
import { buyerScenario3_2 } from "./3.2";
import { buyerScenario4_1 } from "./4.1";
import { buyerScenario4_2 } from "./4.2";

export const buyerWalkthroughs: Walkthrough[] = [
  {
    title: 'Bidding High & Low',
    scenarios: [
      buyerScenario1_1,
      buyerScenario1_2,
      buyerScenario1_3,
      buyerScenario1_4,
    ],
  },
  {
    title: 'Competition',
    scenarios: [
      buyerScenario2_1,
      buyerScenario2_2,
      buyerScenario2_3,
    ],
  },
  {
    title: 'Goodness of Fit',
    scenarios: [
      buyerScenario3_1,
      buyerScenario3_2,
    ],
  },
  {
    title: 'Splitting Bids & Divisible Bidding',
    scenarios: [
      buyerScenario4_1,
      buyerScenario4_2,
    ],
  },
];
