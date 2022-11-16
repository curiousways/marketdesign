import { WalkthroughData } from "@/types/walkthrough";
import { sidebarContentStage1 } from "./sidebar-content/1";
import { sidebarContentStage8 } from "./sidebar-content/8";
import { sidebarContentStage9 } from "./sidebar-content/9";

export const sellerScenario3_2: WalkthroughData = {
  myProjects: [
    {
      title: 'My Project',
      cost: 100000,
      accepted: true,
      discountOrBonus: 37000,
      isMyProject: true,
      products: { biodiversity: 1, nutrients: 2 }
    },
  ],
  buyerProjects: [
    {
      title: 'Buyer 1',
      cost: 350000,
      accepted: true,
      discountOrBonus: 53000,
      products: { biodiversity: 6, nutrients: 8 }
    },
    {
      title: 'Buyer 2',
      cost: 280000,
      accepted: true,
      discountOrBonus: 116000,
      products: { biodiversity: 3, nutrients: 4 }
    },
    {
      title: 'Buyer 3',
      cost: 120000,
      accepted: true,
      discountOrBonus: 73000,
      products: { biodiversity: 3, nutrients: 0 }
    }
  ],
  sellerProjects: [
    {
      title: 'Seller 1',
      cost: 120000,
      accepted: true,
      discountOrBonus: 110000,
      products: { biodiversity: 7, nutrients: 6 }
    },
    {
      title: 'Seller 2',
      cost: 80000,
      accepted: true,
      discountOrBonus: 86000,
      products: { biodiversity: 5, nutrients: 4 }
    }
  ],
  sidebarContent: {
    1: sidebarContentStage1,
    8: sidebarContentStage8,
    9: sidebarContentStage9,
  },
  options: {
    stages: 9,
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
    hide_next_button: [1, 2, 3, 4, 5, 6, 7, 9],
    hide_prev_button: [1],
    show_losers: 4,
    highlight_me: 2
  }
}
