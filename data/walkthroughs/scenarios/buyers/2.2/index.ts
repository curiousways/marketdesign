import { WalkthroughData } from "@/types/walkthrough";
import { sidebarContent1 } from "./sidebar-content/1";
import { sidebarContent8 } from "./sidebar-content/8";

export const buyerScenario2_2: WalkthroughData = {
  "title": "Restricted Supply",
  "project_cost": "280,000",
  "buyers": [
    {
      "id": 1,
      "title": "My Project",
      "bid": "280,000",
      "pays": "150,000",
      "discount": "130,000",
      "products": { "biodiversity": 3, "nutrients": 3 }
    },
    {
      "id": 2,
      "title": "Buyer 1",
      "bid": "240,000",
      "pays": "0",
      "discount": "0",
      "products": { "biodiversity": 3, "nutrients": 1 }
    },
    {
      "id": 3,
      "title": "Buyer 2",
      "bid": "260,000",
      "pays": "0",
      "discount": "0",
      "products": { "biodiversity": 4, "nutrients": 2 }
    }
  ],
  "sellers": [
    {
      "id": 1,
      "title": "Seller 1",
      "offer": "140,000",
      "received": "150,000",
      "bonus": "10,000",
      "products": { "biodiversity": 4, "nutrients": 3 }
    }
  ],
  sidebarContent: {
    1: sidebarContent1,
    8: sidebarContent8,
  },
  "options": {
    "total_bids": "280,000",
    "total_offers": "140,000",
    "surplus": "140,000",
    "next_walkthrough": "2.3",
    "next_walkthrough_title": "Restricted Surplus",
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
    "hide_next_button": [1, 3, 4, 5, 6, 7, 8],
    "hide_prev_button": [1],
    "show_losers": 4,
    "highlight_me": 2
  }
}
