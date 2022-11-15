import { sidebarContentStage1 } from "./sidebar-content/1";
import { sidebarContentStage2 } from "./sidebar-content/2";
import { sidebarContentStage3 } from "./sidebar-content/3";
import { sidebarContentStage4 } from "./sidebar-content/4";
import { sidebarContentStage5 } from "./sidebar-content/5";
import { sidebarContentStage11 } from "./sidebar-content/11";
import { WalkthroughData } from "@/types/walkthrough";

export const sellerScenario1_1: WalkthroughData = {
  "project_cost": "60,000",
  "buyers": [
    {
      "id": 1,
      "title": "Buyer 1",
      "bid": "200,000",
      "pays": "133,000",
      "discount": "67,000",
      "products": { "biodiversity": 1, "nutrients": 4 }
    },
    {
      "id": 2,
      "title": "Buyer 2",
      "bid": "100,000",
      "pays": "32,000",
      "discount": "68,000",
      "products": { "biodiversity": 0, "nutrients": 2 }
    },
    {
      "id": 3,
      "title": "Buyer 3",
      "bid": "120,000",
      "pays": "0",
      "discount": "0",
      "products": { "biodiversity": 4, "nutrients": 0 }
    }
  ],
  "sellers": [
    {
      "id": 1,
      "title": "My Project",
      "offer": "60,000",
      "received": "85,000",
      "bonus": "25,000",
      "products": { "biodiversity": 2, "nutrients": 3 }
    },
    {
      "id": 2,
      "title": "Seller 1",
      "offer": "120,000",
      "received": "0",
      "bonus": "0",
      "products": { "biodiversity": 5, "nutrients": 2 }
    },
    {
      "id": 3,
      "title": "Seller 2",
      "offer": "50,000",
      "received": "80,000",
      "bonus": "30,000",
      "products": { "biodiversity": 0, "nutrients": 3 }
    }
  ],
  sidebarContent: {
    1: sidebarContentStage1,
    2: sidebarContentStage2,
    3: sidebarContentStage3,
    4: sidebarContentStage4,
    5: sidebarContentStage5,
    11: sidebarContentStage11,
  },
  "options": {
    "total_bids": "300,000",
    "total_offers": "110,000",
    "surplus": "190,000",
    "stages": 11,
    "role": "seller",
    "set_my_price": 4,
    "allow_button_click": 4,
    "show_calculating_overlay": [6, 8, 10],
    "show_details_widget": 2,
    "show_solve_market": 5,
    "show_products_quantity": 3,
    "show_market_outcome": 7,
    "show_calculating_winners": 6,
    "show_distributing_surplus": 8,
    "show_calculating_final": 10,
    "show_surpluses": 9,
    "show_final_payments": 11,
    "show_balanced_market": 11,
    "show_bids": 3,
    "show_offers": 3,
    "show_maps": true,
    "show_full_map": 1,
    "show_highlighted_map": 2,
    "show_participants": 3,
    "hide_next_button": [4, 5, 6, 8, 10, 11],
    "hide_prev_button": [1],
    "show_losers": 7,
    "highlight_me": 5
  },
}
