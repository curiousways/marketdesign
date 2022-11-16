import { sidebarContentStage1 } from "./sidebar-content/1";
import { sidebarContentStage2 } from "./sidebar-content/2";
import { sidebarContentStage3 } from "./sidebar-content/3";
import { sidebarContentStage10 } from "./sidebar-content/10";
import { WalkthroughScenario } from "@/types/walkthrough";

export const sellerScenario5_1: WalkthroughScenario = {
  myProjects: [
    {
      title: 'My Project',
      subtitle: 'Field 1',
      cost: 140000,
      discountOrBonus: 0,
      accepted: false,
      isMyProject: true,
      products: { biodiversity: 4, nutrients: 1 },
    },
    {
      title: 'My Project',
      subtitle: 'Field 2',
      cost: 70000,
      discountOrBonus: 37000,
      accepted: true,
      isMyProject: true,
      products: { biodiversity: 1, nutrients: 2 },
    },
  ],
  buyerProjects: [
    {
      title: 'Buyer 1',
      cost: 270000,
      accepted: true,
      discountOrBonus: 37000,
      products: { biodiversity: 1, nutrients: 4 }
    },
    {
      title: 'Buyer 2',
      cost: 120000,
      accepted: false,
      discountOrBonus: 0,
      products: { biodiversity: 3, nutrients: 0 }
    },
  ],
  sellerProjects: [
    {
      title: 'Seller 1',
      cost: 90000,
      accepted: true,
      discountOrBonus: 37000,
      products: { biodiversity: 1, nutrients: 2 }
    },
  ],
  sidebarContent: {
    1: sidebarContentStage1,
    2: sidebarContentStage2,
    3: sidebarContentStage3,
    10: sidebarContentStage10,
  },
  options: {
    stages: 10,
    set_my_price: 3,
    allow_button_click: 3,
    show_calculating_overlay: [5, 7, 9],
    show_details_widget: 2,
    show_solve_market: 4,
    show_market_outcome: 6,
    show_calculating_winners: 5,
    show_distributing_surplus: 7,
    show_calculating_final: 9,
    show_surpluses: 8,
    show_final_payments: 10,
    show_balanced_market: 10,
    show_bids: 3,
    show_offers: 3,
    show_maps: true,
    show_full_map: 1,
    show_highlighted_map: 2,
    show_participants: 3,
    hide_next_button: [3, 4, 5, 6, 7, 8, 9],
    hide_prev_button: [1],
    show_losers: 6,
    highlight_me: 4,
  }
}
