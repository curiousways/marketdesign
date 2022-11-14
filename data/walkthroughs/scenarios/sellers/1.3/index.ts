import { sidebarContentStage1 } from "./sidebar-content/1";
import { sidebarContentStage8 } from "./sidebar-content/8";

export const sellerScenario1_3 = {
  "title": "Offer above cost and lose",
  "project_cost": "60,000",
  "buyers": [
    {
      "id": 1,
      "title": "Buyer 1",
      "bid": "200,000",
      "pays": "162,000",
      "discount": "37,000",
      "products": { "biodiversity": 1, "nutrients": 4 }
    },
    {
      "id": 2,
      "title": "Buyer 2",
      "bid": "100,000",
      "pays": "0",
      "discount": "0",
      "products": { "biodiversity": 0, "nutrients": 2 }
    },
    {
      "id": 3,
      "title": "Buyer 3",
      "bid": "120,000",
      "pays": "99,000",
      "discount": "21,000",
      "products": { "biodiversity": 4, "nutrients": 0 }
    }
  ],
  "sellers": [
    {
      "id": 1,
      "title": "My Project",
      "offer": "100,000",
      "received": "0",
      "bonus": "0",
      "products": { "biodiversity": 2, "nutrients": 3 }
    },
    {
      "id": 2,
      "title": "Seller 1",
      "offer": "120,000",
      "received": "141,000",
      "bonus": "21,000",
      "products": { "biodiversity": 5, "nutrients": 2 }
    },
    {
      "id": 3,
      "title": "Seller 2",
      "offer": "50,000",
      "received": "121,000",
      "bonus": "71,000",
      "products": { "biodiversity": 0, "nutrients": 3 }
    }
  ],
  sidebarContent: {
    1: sidebarContentStage1,
    2: sidebarContentStage8,
  },
  "options": {
    "total_bids": "320,000",
    "total_offers": "170,000",
    "surplus": "150,000",
    "next_walkthrough": 2.1,
    "next_walkthrough_title": "Balanced Supply & Demand",
    "stages": 8,
    "role": "seller",
    "set_my_price": 1,
    "allow_button_click": 1,
    "show_calculating_overlay": [3, 5, 7],
    "show_details_widget": 1,
    "show_solve_market": 2,
    "show_market_outcome": 4,
    "show_calculating_winners": 3,
    "show_distributing_surplus": 5,
    "show_calculating_final": 7,
    "show_surpluses": 6,
    "show_final_payments": 8,
    "show_balanced_market": 8,
    "show_bids": 1,
    "show_offers": 1,
    "show_maps": false,
    "show_full_map": 1,
    "show_highlighted_map": 2,
    "show_participants": 1,
    "hide_next_button": [1, 2, 3, 4, 5, 6, 7, 8],
    "hide_prev_button": [1],
    "hide_description": [2, 3, 4, 5, 6, 7],
    "show_losers": 4,
    "highlight_me": 2
  }
}