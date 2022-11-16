import { WalkthroughScenario } from "@/types/walkthrough";
import { sidebarContent1 } from "./sidebar-content/1";
import { sidebarContent8 } from "./sidebar-content/8";

export const buyerScenario2_2: WalkthroughScenario = {
  myProjects: [
    {
      title: 'My Project',
      cost: 280000,
      accepted: true,
      discountOrBonus: 130000,
      isMyProject: true,
      products: { biodiversity: 3, nutrients: 3 }
    },
  ],
  buyerProjects: [
    {
      title: 'Buyer 1',
      cost: 240000,
      accepted: false,
      discountOrBonus: 0,
      products: { biodiversity: 3, nutrients: 1 }
    },
    {
      title: 'Buyer 2',
      cost: 260000,
      accepted: false,
      discountOrBonus: 0,
      products: { biodiversity: 4, nutrients: 2 }
    }
  ],
  sellerProjects: [
    {
      title: 'Seller 1',
      cost: 140000,
      accepted: true,
      discountOrBonus: 10000,
      products: { biodiversity: 4, nutrients: 3 }
    }
  ],
  sidebarContent: {
    1: sidebarContent1,
    8: sidebarContent8,
  },
  "options": {
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
    "hide_next_button": [1, 3, 4, 5, 6, 7],
    "hide_prev_button": [1],
    "show_losers": 4,
    "highlight_me": 2
  }
}
