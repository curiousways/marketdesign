import { WalkthroughData } from "@/types/walkthrough";

export const buyerScenario3_1: WalkthroughData = {
  "project_cost": "60,000",
  "buyers": [
    {
      "id": 1,
      "title": "My Project",
      "bid": "60,000",
      "pays": "0",
      "discount": "0",
      "products": { "biodiversity": 1, "nutrients": 2 }
    },
    {
      "id": 2,
      "title": "Buyer 1",
      "bid": "200,000",
      "pays": "0",
      "discount": "0",
      "products": { "biodiversity": 5, "nutrients": 2 }
    },
    {
      "id": 3,
      "title": "Buyer 2",
      "bid": "300,000",
      "pays": "250,000",
      "discount": "50,000",
      "products": { "biodiversity": 4, "nutrients": 7 }
    }
  ],
  "sellers": [
    {
      "id": 1,
      "title": "Seller 1",
      "offer": "100,000",
      "received": "0",
      "bonus": "0",
      "products": { "biodiversity": 1, "nutrients": 2 }
    },
    {
      "id": 2,
      "title": "Seller 2",
      "offer": "150,000",
      "received": "250,000",
      "bonus": "100,000",
      "products": { "biodiversity": 6, "nutrients": 7 }
    },
    {
      "id": 3,
      "title": "Seller 3",
      "offer": "210,000",
      "received": "0",
      "bonus": "0",
      "products": { "biodiversity": 4, "nutrients": 4 }
    }
  ],
  "options": {
    "total_bids": "300,000",
    "total_offers": "150,000",
    "surplus": "150,000",
    "stages": 10,
    "role": "buyer",
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
    "show_losers": 6,
    "highlight_me": 4
  }
}
