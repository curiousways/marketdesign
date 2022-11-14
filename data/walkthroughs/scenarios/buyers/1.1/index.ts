import { WalkthroughData } from "@/types/walkthrough";
import { sidebarContent1 } from "./sidebar-content/1";
import { sidebarContent12 } from "./sidebar-content/12";
import { sidebarContent2 } from "./sidebar-content/2";
import { sidebarContent3 } from "./sidebar-content/3";
import { sidebarContent4 } from "./sidebar-content/4";
import { sidebarContent5 } from "./sidebar-content/5";
import { sidebarContent6 } from "./sidebar-content/6";

export const buyerScenario1_1: WalkthroughData = {
  "title": "Offer at cost and win",
  "project_cost": "120,000",
  "buyers": [
    {
      "id": 1,
      "title": "My Project",
      "bid": "120,000",
      "pays": "107,500",
      "discount": "12,500",
      "products": { "biodiversity": 1, "nutrients": 3 }
    },
    {
      "id": 2,
      "title": "Buyer 1",
      "bid": "100,000",
      "pays": "92,500",
      "discount": "7,500",
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
      "received": "0",
      "bonus": "25,000",
      "products": { "biodiversity": 3, "nutrients": 1 }
    },
    {
      "id": 2,
      "title": "Seller 2",
      "offer": "80,000",
      "received": "87,500",
      "bonus": "7,500",
      "products": { "biodiversity": 2, "nutrients": 1 }
    },
    {
      "id": 3,
      "title": "Seller 3",
      "offer": "100,000",
      "received": "112,500",
      "bonus": "12,500",
      "products": { "biodiversity": 1, "nutrients": 4 }
    }
  ],
  sidebarContent: {
    1: sidebarContent1,
    2: sidebarContent2,
    3: sidebarContent3,
    4: sidebarContent4,
    5: sidebarContent5,
    6: sidebarContent6,
    12: sidebarContent12,
  },
  "options": {
    "total_bids": "220,000",
    "total_offers": "180,000",
    "surplus": "40,000",
    "next_walkthrough": "1.2",
    "next_walkthrough_title": "Offer above cost and win",
    "stages": 12,
    "role": "buyer",
    "set_my_price": 5,
    "allow_button_click": 5,
    "show_calculating_overlay": [7, 9, 11],
    "show_details_widget": 2,
    "show_solve_market": 6,
    "show_market_outcome": 8,
    "show_calculating_winners": 7,
    "show_distributing_surplus": 9,
    "show_calculating_final": 11,
    "show_surpluses": 10,
    "show_final_payments": 12,
    "show_balanced_market": 12,
    "show_bids": 3,
    "show_offers": 3,
    "show_maps": false,
    "show_full_map": 1,
    "show_highlighted_map": 2,
    "show_participants": 3,
    "hide_next_button": [5, 6, 7, 8, 9, 10, 11, 12],
    "hide_prev_button": [1],
    "show_losers": 8,
    "highlight_me": 6
  },
}
