import { Walkthrough } from "@/types/walkthrough";
import { buyerScenario1_1 } from "./scenarios/buyers/1.1";
import { buyerScenario1_2 } from "./scenarios/buyers/1.2";
import { buyerScenario1_3 } from "./scenarios/buyers/1.3";
import { buyerScenario2_1 } from "./scenarios/buyers/2.1";
import { buyerScenario2_2 } from "./scenarios/buyers/2.2";
import { buyerScenario2_3 } from "./scenarios/buyers/2.3";
import { buyerScenario3_1 } from "./scenarios/buyers/3.1";
import { buyerScenario3_2 } from "./scenarios/buyers/3.2";
import { sellerScenario1_1 } from "./scenarios/sellers/1.1";
import { sellerScenario1_2 } from "./scenarios/sellers/1.2";
import { sellerScenario1_3 } from "./scenarios/sellers/1.3";
import { sellerScenario2_1 } from "./scenarios/sellers/2.1";
import { sellerScenario2_2 } from "./scenarios/sellers/2.2";
import { sellerScenario2_3 } from "./scenarios/sellers/2.3";
import { sellerScenario3_1 } from "./scenarios/sellers/3.1";
import { sellerScenario3_2 } from "./scenarios/sellers/3.2";

export const walkthroughs: Walkthrough[] = [
  {
    id: 1,
    title: 'Bidding High & Low',
    scenarios: [
      {
        id: '1.1',
        title: 'Offer at cost and win',
        buyer: buyerScenario1_1,
        seller: sellerScenario1_1,
      },
      {
        id: '1.2',
        title: 'Offer above cost and win',
        buyer: buyerScenario1_2,
        seller: sellerScenario1_2,
      },
      {
        id: '1.3',
        title: 'Offer above cost and lose',
        buyer: buyerScenario1_3,
        seller: sellerScenario1_3,
      },
    ]
  },
  {
    id: 2,
    title: 'Competition',
    scenarios: [
      {
        id: '2.1',
        title: 'Baland supply & demand',
        buyer: buyerScenario2_1,
        seller: sellerScenario2_1,
      },
      {
        id: '2.2',
        title: 'Resitricted supply',
        buyer: buyerScenario2_2,
        seller: sellerScenario2_2,
      },
      {
        id: '2.3',
        title: 'Resitricted Demand',
        buyer: buyerScenario2_3,
        seller: sellerScenario2_3,
      },
    ]
  },
  {
    id: 3,
    title: 'Competition',
    scenarios: [
      {
        id: '3.1',
        title: 'Poor fit bid',
        buyer: buyerScenario3_1,
        seller: sellerScenario3_1,
      },
      {
        id: '3.2',
        title: 'Good fit bid',
        buyer: buyerScenario3_2,
        seller: sellerScenario3_2,
      },
    ]
  },
];
