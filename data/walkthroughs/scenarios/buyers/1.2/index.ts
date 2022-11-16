import { WalkthroughScenario } from "@/types/walkthrough";
import { sidebarContent1 } from "./sidebar-content/1";
import { sidebarContent8 } from "./sidebar-content/8";

export const buyerScenario1_2: WalkthroughScenario = {
  myProjects: [
    {
      title: 'My Project',
      cost: 100000,
      discountOrBonus: 2500,
      accepted: true,
      isMyProject: true,
      products: { biodiversity: 1, nutrients: 3 },
    },
  ],
  buyerProjects: [
    {
      title: 'Buyer 1',
      cost: 100000,
      discountOrBonus: 7500,
      accepted: true,
      products: { biodiversity: 2, nutrients: 2 }
    },
    {
      title: 'Buyer 2',
      cost: 110000,
      discountOrBonus: 0,
      accepted: false,
      products: { biodiversity: 3, nutrients: 0 }
    }
  ],
  sellerProjects: [
    {
      title: 'Seller 1',
      cost: 120000,
      discountOrBonus: 0,
      accepted: false,
      products: { biodiversity: 3, nutrients: 1 }
    },
    {
      title: 'Seller 2',
      cost: 80000,
      discountOrBonus: 7500,
      accepted: true,
      products: { biodiversity: 2, nutrients: 1 }
    },
    {
      title: 'Seller 3',
      cost: 100000,
      discountOrBonus: 2500,
      accepted: true,
      products: { biodiversity: 1, nutrients: 4 }
    },
  ],
  sidebarContent: {
    1: sidebarContent1,
    8: sidebarContent8,
  },
  options: {
    stages: 8,
    set_my_price: 1,
    allow_button_click: 1,
    show_calculating_overlay: [3, 5, 7],
    show_details_widget: 1,
    show_solve_market: 2,
    show_market_outcome: 4,
    show_calculating_winners: 3,
    show_distributing_surplus: 5,
    show_calculating_final: 7,
    show_surpluses: 6,
    show_final_payments: 8,
    show_balanced_market: 8,
    show_bids: 1,
    show_offers: 1,
    show_maps: false,
    show_full_map: 1,
    show_highlighted_map: 2,
    show_participants: 1,
    hide_next_button: [1, 2, 3, 4, 5, 6, 7],
    hide_prev_button: [1],
    show_losers: 4,
    highlight_me: 2
  }
}
