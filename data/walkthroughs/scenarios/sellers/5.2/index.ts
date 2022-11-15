import { sidebarContentStage1 } from "./sidebar-content/1";
import { WalkthroughData } from "@/types/walkthrough";
import { sidebarContentStage8 } from "./sidebar-content/8";

export const sellerScenario5_2: WalkthroughData = {
  myProjects: [
    {
      title: 'My Project',
      subtitle: 'Project 1',
      cost: 140000,
      discountOrBonus: 0,
      accepted: false,
      isMyProject: true,
      isInactive: true,
      products: { biodiversity: 1, nutrients: 3 },
    },
    {
      title: 'My Project',
      subtitle: 'Project 2',
      cost: 180000,
      discountOrBonus: 50000,
      accepted: true,
      isMyProject: true,
      products: { biodiversity: 2, nutrients: 5 },
    },
  ],
  buyerProjects: [
    {
      title: 'Buyer 1',
      cost: 220000,
      accepted: true,
      discountOrBonus: 50000,
      products: { biodiversity: 1, nutrients: 4 }
    },
    {
      title: 'Buyer 2',
      cost: 120000,
      accepted: false,
      discountOrBonus: 0,
      products: { biodiversity: 3, nutrients: 0 }
    },
    {
      title: 'Buyer 3',
      cost: 100000,
      accepted: true,
      discountOrBonus: 40000,
      products: { biodiversity: 1, nutrients: 1 }
    }
  ],
  sellerProjects: [
    {
      title: 'Seller 1',
      cost: 90000,
      accepted: false,
      discountOrBonus: 0,
      products: { biodiversity: 1, nutrients: 3 }
    },
  ],
  sidebarContent: {
    1: sidebarContentStage1,
    8: sidebarContentStage8,
  },
  options: {
    total_bids: '320,000',
    total_offers: '180,000',
    surplus: '140,000',
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
