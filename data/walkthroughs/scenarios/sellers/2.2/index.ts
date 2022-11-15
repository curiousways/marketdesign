import { WalkthroughData } from "@/types/walkthrough";
import { sidebarContentStage1 } from "./sidebar-content/1";
import { sidebarContentStage8 } from "./sidebar-content/8";

export const sellerScenario2_2: WalkthroughData = {
  "project_cost": "140,000",
  "buyers": [
    {
      "id": 1,
      "title": "Buyer 1",
      "bid": "280,000",
      "pays": "150,000",
      "discount": "130,000",
      "products": { "biodiversity": 3, "nutrients": 3 }
    }
  ],
  "sellers": [
    {
      "id": 1,
      "title": "My Project",
      "offer": "140,000",
      "received": "150,000",
      "bonus": "10,000",
      "products": { "biodiversity": 4, "nutrients": 3 }
    },
    {
      "id": 2,
      "title": "Seller 1",
      "offer": "120,000",
      "received": "0",
      "bonus": "0",
      "products": { "biodiversity": 3, "nutrients": 2 }
    },
    {
      "id": 3,
      "title": "Seller 2",
      "offer": "160,000",
      "received": "0",
      "bonus": "0",
      "products": { "biodiversity": 3, "nutrients": 3 }
    }
  ],
  sidebarContent: {
    1: sidebarContentStage1,
    2: sidebarContentStage8,
  },
  "options": {
    "total_bids": "280,000",
    "total_offers": "140,000",
    "surplus": "140,000",
    "stages": 8,
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
    "hide_next_button": [1, 2, 3, 4, 5, 6, 7],
    "hide_prev_button": [1],
    "show_losers": 4,
    "highlight_me": 2
  }
}
