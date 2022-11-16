import { sidebarContentStage1 } from "./sidebar-content/1";
import { sidebarContentStage2 } from "./sidebar-content/2";
import { sidebarContentStage3 } from "./sidebar-content/3";
import { sidebarContentStage12 } from "./sidebar-content/12";
import { WalkthroughScenario } from "@/types/walkthrough";
import { sidebarContentStage4 } from "./sidebar-content/4";
import { sidebarContentStage5 } from "./sidebar-content/5";

export const sellerScenario5_1: WalkthroughScenario = {
  myProjects: [
    {
      title: 'My Project',
      subtitle: 'Project 1',
      cost: 140000,
      discountOrBonus: 44000,
      accepted: true,
      isMyProject: true,
      products: { biodiversity: 1, nutrients: 3 },
    },
    {
      title: 'My Project',
      subtitle: 'Project 2',
      cost: 180000,
      discountOrBonus: 0,
      accepted: false,
      isMyProject: true,
      isInactive: true,
      products: { biodiversity: 2, nutrients: 5 },
    },
  ],
  buyerProjects: [
    {
      title: 'Buyer 1',
      cost: 220000,
      accepted: true,
      discountOrBonus: 7000,
      products: { biodiversity: 1, nutrients: 4 }
    },
    {
      title: 'Buyer 2',
      cost: 120000,
      accepted: true,
      discountOrBonus: 44000,
      products: { biodiversity: 3, nutrients: 0 }
    },
    {
      title: 'Buyer 3',
      cost: 100000,
      accepted: false,
      discountOrBonus: 0,
      products: { biodiversity: 1, nutrients: 1 }
    }
  ],
  sellerProjects: [
    {
      title: 'Seller 1',
      cost: 90000,
      accepted: true,
      discountOrBonus: 14000,
      products: { biodiversity: 1, nutrients: 3 }
    },
  ],
  sidebarContent: {
    1: sidebarContentStage1,
    2: sidebarContentStage2,
    3: sidebarContentStage3,
    4: sidebarContentStage4,
    5: sidebarContentStage5,
    12: sidebarContentStage12,
  },
  options: {
    stages: 12,
    set_my_price: 5,
    allow_button_click: 5,
    show_calculating_overlay: [7, 9, 11],
    show_details_widget: 2,
    show_solve_market: 6,
    show_market_outcome: 8,
    show_calculating_winners: 7,
    show_distributing_surplus: 9,
    show_calculating_final: 11,
    show_surpluses: 10,
    show_final_payments: 12,
    show_balanced_market: 12,
    show_bids: 3,
    show_offers: 3,
    show_maps: true,
    show_full_map: 1,
    show_highlighted_map: 2,
    show_participants: 4,
    hide_next_button: [5, 6, 7, 8, 9],
    hide_prev_button: [1],
    show_losers: 8,
    highlight_me: 6,
  }
}
