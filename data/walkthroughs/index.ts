import { Walkthrough } from "@/types/walkthrough";
import { buyerScenario1_1 } from "./scenarios/buyers/1.1";
import { buyerScenario1_2 } from "./scenarios/buyers/1.2";
import { buyerScenario1_3 } from "./scenarios/buyers/1.3";
import { buyerScenario2_1 } from "./scenarios/buyers/2.1";
import { buyerScenario2_2 } from "./scenarios/buyers/2.2";
import { buyerScenario2_3 } from "./scenarios/buyers/2.3";
import { buyerScenario3_1 } from "./scenarios/buyers/3.1";
import { buyerScenario3_2 } from "./scenarios/buyers/3.2";
import { buyerScenario4_1 } from "./scenarios/buyers/4.1";
import { buyerScenario4_2 } from "./scenarios/buyers/4.2";
import { sellerScenario1_1 } from "./scenarios/sellers/1.1";
import { sellerScenario1_2 } from "./scenarios/sellers/1.2";
import { sellerScenario1_3 } from "./scenarios/sellers/1.3";
import { sellerScenario2_1 } from "./scenarios/sellers/2.1";
import { sellerScenario2_2 } from "./scenarios/sellers/2.2";
import { sellerScenario2_3 } from "./scenarios/sellers/2.3";
import { sellerScenario3_1 } from "./scenarios/sellers/3.1";
import { sellerScenario3_2 } from "./scenarios/sellers/3.2";
import { sellerScenario5_1 } from "./scenarios/sellers/5.1";
import { sellerScenario5_2 } from "./scenarios/sellers/5.2";
import { sellerScenario5_3 } from "./scenarios/sellers/5.3";

export const walkthroughs: Walkthrough[] = [
  {
    id: 0,
    title: 'Market Introduction',
    scenarios: [
      {
        id: '0.0',
        title: 'Market Introduction',
        roles: {},
      },
    ]
  },
  {
    id: 1,
    title: 'Bidding High & Low',
    scenarios: [
      {
        id: '1.1',
        title: 'Offer at cost and win',
        roles: {
          buyer: buyerScenario1_1,
          seller: sellerScenario1_1,
        },
      },
      {
        id: '1.2',
        title: 'Offer above cost and win',
        roles: {
          buyer: buyerScenario1_2,
          seller: sellerScenario1_2,
        },
      },
      {
        id: '1.3',
        title: 'Offer above cost and lose',
        roles: {
          buyer: buyerScenario1_3,
          seller: sellerScenario1_3,
        },
      },
    ]
  },
  {
    id: 2,
    title: 'Competition',
    scenarios: [
      {
        id: '2.1',
        title: 'Balanced supply & demand',
        roles: {
          buyer: buyerScenario2_1,
          seller: sellerScenario2_1,
        },
      },
      {
        id: '2.2',
        title: 'Resitricted supply',
        roles: {
          buyer: buyerScenario2_2,
          seller: sellerScenario2_2,
        },
      },
      {
        id: '2.3',
        title: 'Resitricted Demand',
        roles: {
          buyer: buyerScenario2_3,
          seller: sellerScenario2_3,
        },
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
        roles: {
          buyer: buyerScenario3_1,
          seller: sellerScenario3_1,
        },
      },
      {
        id: '3.2',
        title: 'Good fit bid',
        roles: {
          buyer: buyerScenario3_2,
          seller: sellerScenario3_2,
        },
      },
    ]
  },
  {
    id: 4,
    title: 'Splitting Bids & Divisible Bidding',
    scenarios: [
      {
        id: '4.1',
        title: 'Divisible Bid',
        roles: {
          buyer: buyerScenario4_1,
        },
      },
      {
        id: '4.2',
        title: 'Undivided Bid',
        roles: {
          buyer: buyerScenario4_2,
        },
      },
    ]
  },
  {
    id: 5,
    title: 'Project Options for the Same Field',
    scenarios: [
      {
        id: '5.1',
        title: 'Project 1 Bid',
        roles: {
          seller: sellerScenario5_1,
        },
      },
      {
        id: '5.2',
        title: 'Project 2 Bid',
        roles: {
          seller: sellerScenario5_2,
        },
      },
      {
        id: '5.3',
        title: '5.3 Project 1 & Project 2 XOR Bid',
        roles: {
          seller: sellerScenario5_3,
        },
      },
    ],
  },
];
