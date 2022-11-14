import { Data } from "@/types/walkthrough";

export const buyerScenario1_1: Data = {
  "title": "Offer at cost and win",
  "project_cost": "120,000",
  "buyers": [
    {
      "id": 1,
      "title": "My Project",
      "bid": "120,000",
      "pays": "133,000",
      "discount": "67,000",
      "products": { "biodiversity": 1, "nutrients": 3 }
    },
    {
      "id": 2,
      "title": "Buyer 1",
      "bid": "100,000",
      "pays": "32,000",
      "discount": "68,000",
      "products": { "biodiversity": 2, "nutrients": 2 }
    },
    {
      "id": 3,
      "title": "Buyer 2",
      "bid": "110,000",
      "pays": "0",
      "discount": "0",
      "products": { "biodiversity": 3, "nutrients": 0 }
    }
  ],
  "sellers": [
    {
      "id": 1,
      "title": "Seller 1",
      "offer": "120,000",
      "received": "85,000",
      "bonus": "25,000",
      "products": { "biodiversity": 3, "nutrients": 1 }
    },
    {
      "id": 2,
      "title": "Seller 2",
      "offer": "80,000",
      "received": "0",
      "bonus": "0",
      "products": { "biodiversity": 2, "nutrients": 1 }
    },
    {
      "id": 3,
      "title": "Seller 3",
      "offer": "50,000",
      "received": "100,000",
      "bonus": "30,000",
      "products": { "biodiversity": 1, "nutrients": 4 }
    }
  ],
  "options": {
    "total_bids": "300,000",
    "total_offers": "110,000",
    "surplus": "190,000",
    "next_walkthrough": "1.2",
    "next_walkthrough_title": "Offer above cost and win",
    "stages": 11,
    "role": "buyer",
    "set_my_price": 4,
    "allow_button_click": 4,
    "show_calculating_overlay": [6, 8, 10],
    "show_details_widget": 2,
    "show_solve_market": 5,
    "show_market_outcome": 7,
    "show_calculating_winners": 6,
    "show_distributing_surplus": 8,
    "show_calculating_final": 10,
    "show_surpluses": 9,
    "show_final_payments": 11,
    "show_balanced_market": 11,
    "show_bids": 3,
    "show_offers": 3,
    "show_maps": false,
    "show_full_map": 1,
    "show_highlighted_map": 2,
    "show_participants": 3,
    "hide_next_button": [5, 4, 6, 7, 8, 9, 10, 11],
    "hide_prev_button": [1],
    "show_losers": 7,
    "highlight_me": 5
  },
}
