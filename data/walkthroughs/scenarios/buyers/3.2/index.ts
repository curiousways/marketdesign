import { Data } from "@/types/walkthrough";

export const buyerScenario3_2: Data = {
  "title": "Poor fit bid",
  "project_cost": "60,000",
  "buyers": [
    {
      "id": 1,
      "title": "My Project",
      "bid": "60,000",
      "pays": "296,000",
      "discount": "53,000",
      "products": { "biodiversity": 2, "nutrients": 1 }
    },
    {
      "id": 2,
      "title": "Buyer 1",
      "bid": "200,000",
      "pays": "164,000",
      "discount": "116,000",
      "products": { "biodiversity": 5, "nutrients": 2 }
    },
    {
      "id": 3,
      "title": "Buyer 2",
      "bid": "300,000",
      "pays": "73,000",
      "discount": "73,000",
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
      "received": "230,000",
      "bonus": "110,000",
      "products": { "biodiversity": 6, "nutrients": 7 }
    },
    {
      "id": 3,
      "title": "Seller 3",
      "offer": "210,000",
      "received": "166,000",
      "bonus": "86,000",
      "products": { "biodiversity": 4, "nutrients": 4 }
    }
  ],
  "options": {
    "total_bids": "560,000",
    "total_offers": "360,000",
    "surplus": "200,000",
    "next_walkthrough": 4,
    "next_walkthrough_title": "Poor fit bid",
    "stages": 9,
    "role": "buyer",
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
    "hide_next_button": [1, 2, 3, 4, 5, 6, 7, 9],
    "hide_prev_button": [1],
    "show_losers": 4,
    "highlight_me": 2
  }
}
