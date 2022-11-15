import { WalkthroughData } from "@/types/walkthrough";
import { sidebarContent1 } from "./sidebar-content/1";
import { sidebarContent10 } from "./sidebar-content/10";
import { sidebarContent2 } from "./sidebar-content/2";
import { sidebarContent3 } from "./sidebar-content/3";

export const buyerScenario2_1: WalkthroughData = {
  myProjects: [
    {
      title: 'My Project',
      cost: 280000,
      accepted: true,
      discountOrBonus: 72000,
      isMyProject: true,
      products: { biodiversity: 3, nutrients: 3 }
    },
  ],
  buyerProjects: [
    {
      title: 'Buyer 1',
      cost: 240000,
      accepted: true,
      discountOrBonus: 61000,
      products: { biodiversity: 3, nutrients: 1 }
    },
    {
      title: 'Buyer 2',
      cost: 260000,
      accepted: true,
      discountOrBonus: 45000,
      products: { biodiversity: 4, nutrients: 2 }
    }
  ],
  sellerProjects: [
    {
      title: 'Seller 1',
      cost: 140000,
      accepted: true,
      discountOrBonus: 84000,
      products: { biodiversity: 4, nutrients: 3 }
    },
    {
      title: 'Seller 2',
      cost: 120000,
      accepted: true,
      discountOrBonus: 53000,
      products: { biodiversity: 3, nutrients: 2 }
    },
    {
      title: 'Seller 3',
      cost: 160000,
      accepted: true,
      discountOrBonus: 45000,
      products: { biodiversity: 3, nutrients: 3 }
    }
  ],
  sidebarContent: {
    1: sidebarContent1,
    2: sidebarContent2,
    3: sidebarContent3,
    10: sidebarContent10,
  },
  "options": {
    "total_bids": "780,000",
    "total_offers": "420,000",
    "surplus": "360,000",
    "stages": 10,
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
    "show_maps": true,
    "show_full_map": 1,
    "show_highlighted_map": 2,
    "show_participants": 3,
    "hide_next_button": [3, 4, 5, 6, 7, 8, 9],
    "hide_prev_button": [1],
    "show_losers": 6,
    "highlight_me": 4
  }
}
