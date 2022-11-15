import { WalkthroughData } from "@/types/walkthrough";

export const buyerScenario3_1: WalkthroughData = {
  myProjects: [
    {
      title: 'My Project',
      cost: 60000,
      accepted: false,
      discountOrBonus: 0,
      isMyProject: true,
      products: { biodiversity: 1, nutrients: 2 }
    },
  ],
  buyerProjects: [
    {
      title: 'Buyer 1',
      cost: 200000,
      accepted: false,
      discountOrBonus: 0,
      products: { biodiversity: 5, nutrients: 2 }
    },
    {
      title: 'Buyer 2',
      cost: 300000,
      accepted: true,
      discountOrBonus: 50000,
      products: { biodiversity: 4, nutrients: 7 }
    }
  ],
  sellerProjects: [
    {
      title: 'Seller 1',
      cost: 100000,
      accepted: false,
      discountOrBonus: 0,
      products: { biodiversity: 1, nutrients: 2 }
    },
    {
      title: 'Seller 2',
      cost: 150000,
      accepted: true,
      discountOrBonus: 100000,
      products: { biodiversity: 6, nutrients: 7 }
    },
    {
      title: 'Seller 3',
      cost: 210000,
      accepted: false,
      discountOrBonus: 0,
      products: { biodiversity: 4, nutrients: 4 }
    }
  ],
  "options": {
    "total_bids": "300,000",
    "total_offers": "150,000",
    "surplus": "150,000",
    "stages": 10,
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
    "hide_next_button": [3, 4, 5, 6, 7, 8, 9],
    "hide_prev_button": [1],
    "show_losers": 6,
    "highlight_me": 4
  }
}
