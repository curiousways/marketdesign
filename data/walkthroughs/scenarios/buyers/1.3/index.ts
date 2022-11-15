export const buyerScenario1_3 = {
  "title": "Offer above cost and lose",
  "project_cost": "120,000",
  "buyers": [
    {
      "id": 1,
      "title": "My Project",
      "bid": "80,000",
      "pays": "0",
      "discount": "0",
      "products": { "biodiversity": 1, "nutrients": 3 }
    },
    {
      "id": 2,
      "title": "Buyer 1",
      "bid": "100,000",
      "pays": "97,500",
      "discount": "2,500",
      "products": { "biodiversity": 2, "nutrients": 2 }
    },
    {
      "id": 3,
      "title": "Buyer 2",
      "bid": "110,000",
      "pays": "107,500",
      "discount": "2,500",
      "products": { "biodiversity": 3, "nutrients": 0 }
    }
  ],
  "sellers": [
    {
      "id": 1,
      "title": "Seller 1",
      "offer": "120,000",
      "received": "122,500",
      "bonus": "2,500",
      "products": { "biodiversity": 3, "nutrients": 1 }
    },
    {
      "id": 2,
      "title": "Seller 2",
      "offer": "80,000",
      "received": "82,500",
      "bonus": "2,500",
      "products": { "biodiversity": 2, "nutrients": 1 }
    },
    {
      "id": 3,
      "title": "Seller 3",
      "offer": "100,000",
      "received": "0",
      "bonus": "0",
      "products": { "biodiversity": 1, "nutrients": 4 }
    }
  ],
  "options": {
    "total_bids": "210,000",
    "total_offers": "200,000",
    "surplus": "10,000",
    "next_walkthrough": 2.1,
    "next_walkthrough_title": "Balanced Supply & Demand",
    "stages": 8,
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
    "hide_next_button": [1, 2, 3, 4, 5, 6, 7, 8],
    "hide_prev_button": [1],
    "show_losers": 4,
    "highlight_me": 2
  }
}
