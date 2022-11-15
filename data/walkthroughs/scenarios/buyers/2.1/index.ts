import { WalkthroughData } from "@/types/walkthrough";

export const buyerScenario2_1: WalkthroughData = {
  "title": "Balanced Supply & Demand",
  "project_cost": "280,000",
  "buyers": [
    {
      "id": 1,
      "title": "My Project",
      "bid": "280,000",
      "pays": "208,000",
      "discount": "72,000",
      "products": { "biodiversity": 3, "nutrients": 3 }
    },
    {
      "id": 2,
      "title": "Buyer 1",
      "bid": "240,000",
      "pays": "179,000",
      "discount": "61,000",
      "products": { "biodiversity": 3, "nutrients": 1 }
    },
    {
      "id": 3,
      "title": "Buyer 2",
      "bid": "260,000",
      "pays": "215,000",
      "discount": "45,000",
      "products": { "biodiversity": 4, "nutrients": 2 }
    }
  ],
  "sellers": [
    {
      "id": 1,
      "title": "Seller 1",
      "offer": "140,000",
      "received": "224,000",
      "bonus": "84,000",
      "products": { "biodiversity": 4, "nutrients": 3 }
    },
    {
      "id": 2,
      "title": "Seller 2",
      "offer": "120,000",
      "received": "173,000",
      "bonus": "53,000",
      "products": { "biodiversity": 3, "nutrients": 2 }
    },
    {
      "id": 3,
      "title": "Seller 3",
      "offer": "160,000",
      "received": "205,000",
      "bonus": "45,000",
      "products": { "biodiversity": 3, "nutrients": 3 }
    }
  ],
  "options": {
    "total_bids": "780,000",
    "total_offers": "420,000",
    "surplus": "360,000",
    "next_walkthrough": "2.2",
    "next_walkthrough_title": "Restricted Supply",
    "stages": 10,
    "role": "buyer",
    "set_my_price": 3,
    "allow_button_click": 3,
    "show_calculating_overlay": [5, 7, 9],
    "show_details_widget": 2,
    "show_solve_market": 4,
    "show_products_quantity": 3,
    "show_market_outcome": 6,
    "show_calculating_winners": 5,
    "show_distributing_surplus": 7,
    "show_calculating_final": 9,
    "show_surpluses": 8,
    "show_final_payments": 10,
    "show_balanced_market": 10,
    "show_bids": 3,
    "show_offers": 3,
    "show_map": [1],
    "show_participants": 3,
    "hide_next_button": [3, 4, 5, 6, 7, 8, 9, 10],
    "hide_prev_button": [1],
    "show_losers": 6,
    "highlight_me": 4
  }
}
