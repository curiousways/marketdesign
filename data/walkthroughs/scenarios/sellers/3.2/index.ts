import { WalkthroughData } from "@/types/walkthrough";
import { sidebarContentStage1 } from "./sidebar-content/1";
import { sidebarContentStage8 } from "./sidebar-content/8";
import { sidebarContentStage9 } from "./sidebar-content/9";

export const sellerScenario3_2: WalkthroughData = {
  "project_cost": "100,000",
  "buyers": [
    {
      "id": 1,
      "title": "Buyer 1",
      "bid": "350,000",
      "pays": "296,000",
      "discount": "53,000",
      "products": { "biodiversity": 6, "nutrients": 8 }
    },
    {
      "id": 2,
      "title": "Buyer 2",
      "bid": "280,000",
      "pays": "164,000",
      "discount": "116,000",
      "products": { "biodiversity": 3, "nutrients": 4 }
    },
    {
      "id": 3,
      "title": "Buyer 3",
      "bid": "120,000",
      "pays": "73,000",
      "discount": "73,000",
      "products": { "biodiversity": 3, "nutrients": 0 }
    }
  ],
  "sellers": [
    {
      "id": 1,
      "title": "My Project",
      "offer": "100,000",
      "received": "137,000",
      "bonus": "37,000",
      "products": { "biodiversity": 1, "nutrients": 2 }
    },
    {
      "id": 2,
      "title": "Seller 1",
      "offer": "120,000",
      "received": "230,000",
      "bonus": "110,000",
      "products": { "biodiversity": 7, "nutrients": 6 }
    },
    {
      "id": 3,
      "title": "Seller 2",
      "offer": "80,000",
      "received": "166,000",
      "bonus": "86,000",
      "products": { "biodiversity": 5, "nutrients": 4 }
    }
  ],
  sidebarContent: {
    1: sidebarContentStage1,
    8: sidebarContentStage8,
    9: sidebarContentStage9,
  },
  "options": {
    "total_bids": "750,000",
    "total_offers": "300,000",
    "surplus": "450,000",
    "stages": 9,
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
