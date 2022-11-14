import { sidebarContentStage1 } from "./sidebar-content/1";
import { sidebarContentStage2 } from "./sidebar-content/2";
import { sidebarContentStage3 } from "./sidebar-content/3";
import { sidebarContentStage10 } from "./sidebar-content/10";

export const sellerScenario3_1 = {
  "title": "Poor fit bid",
  "project_cost": "100,000",
  "buyers": [
    {
      "id": 1,
      "title": "Buyer 1",
      "bid": "350,000",
      "pays": "0",
      "discount": "0",
      "products": { "biodiversity": 6, "nutrients": 8 }
    },
    {
      "id": 2,
      "title": "Buyer 2",
      "bid": "280,000",
      "pays": "162,000",
      "discount": "45,000",
      "products": { "biodiversity": 4, "nutrients": 4 }
    },
    {
      "id": 3,
      "title": "Buyer 3",
      "bid": "120,000",
      "pays": "162,000",
      "discount": "72,000",
      "products": { "biodiversity": 3, "nutrients": 0 }
    }
  ],
  "sellers": [
    {
      "id": 1,
      "title": "My Project",
      "offer": "100,000",
      "received": "0",
      "bonus": "0",
      "products": { "biodiversity": 2, "nutrients": 1 }
    },
    {
      "id": 2,
      "title": "Seller 1",
      "offer": "120,000",
      "received": "141,000",
      "bonus": "53,000",
      "products": { "biodiversity": 7, "nutrients": 6 }
    },
    {
      "id": 3,
      "title": "Seller 2",
      "offer": "80,000",
      "received": "0",
      "bonus": "0",
      "products": { "biodiversity": 5, "nutrients": 4 }
    }
  ],
  sidebarContent: {
    1: sidebarContentStage1,
    2: sidebarContentStage2,
    3: sidebarContentStage3,
    10: sidebarContentStage10,
  },
  "options": {
    "total_bids": "400,000",
    "total_offers": "120,000",
    "surplus": "280,000",
    "next_walkthrough": 3.2,
    "next_walkthrough_title": "Poor fit bid",
    "stages": 10,
    "role": "seller",
    "set_my_price": 3,
    "allow_button_click": 3,
    "show_calculating_overlay": [5, 7, 9],
    "show_details_widget": 2,
    "show_solve_market": 4,
    "show_market_outcome": 6,
    "show_calculating_winners": 5,
    "show_distributing_surplus": 7,
    "show_calculating_final": 9,
    "show_surpluses": 8,
    "show_final_payments": 10,
    "show_balanced_market": 10,
    "show_bids": 3,
    "show_offers": 3,
    "show_maps": true,
    "show_full_map": 1,
    "show_highlighted_map": 2,
    "show_participants": 3,
    "hide_next_button": [3, 4, 5, 6, 7, 8, 9, 10],
    "hide_prev_button": [1],
    "hide_description": [4, 5, 6, 7, 8, 9],
    "show_losers": 6,
    "highlight_me": 4
  }
}