import { Walkthrough } from "@/types/walkthrough";
import { sellerScenario1_1 } from "./1.1";
import { sellerScenario1_2 } from "./1.2";
import { sellerScenario1_3 } from "./1.3";
import { sellerScenario2_1 } from "./2.1";
import { sellerScenario2_2 } from "./2.2";
import { sellerScenario2_3 } from "./2.3";
import { sellerScenario3_1 } from "./3.1";
import { sellerScenario3_2 } from "./3.2";
import { sellerScenario4_1 } from "./4.1";
import { sellerScenario4_2 } from "./4.2";
import { sellerScenario4_3 } from "./4.3";

export const sellerWalkthroughs: Walkthrough[] = [
  {
    title: 'Bidding High & Low',
    scenarios: [
      sellerScenario1_1,
      sellerScenario1_2,
      sellerScenario1_3,
    ],
  },
  {
    title: 'Competition',
    scenarios: [
      sellerScenario2_1,
      sellerScenario2_2,
      sellerScenario2_3,
    ],
  },
  {
    title: 'Goodness of Fit',
    scenarios: [
      sellerScenario3_1,
      sellerScenario3_2,
    ],
  },
  {
    title: 'Project Options for the Same Field',
    scenarios: [
      sellerScenario4_1,
      sellerScenario4_2,
      sellerScenario4_3,
    ],
  },
];
