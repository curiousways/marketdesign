import { sidebarContentStage1 } from "./sidebar-content/1";
import { sidebarContentStage2 } from "./sidebar-content/2";
import { WalkthroughScenario } from "@/types/walkthrough";
import { sidebarContentStage9 } from "./sidebar-content/9";
import { sidebarContentStage10 } from "./sidebar-content/10";

export const sellerScenario5_2: WalkthroughScenario = {
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
      discountOrBonus: 0,
      accepted: false,
      isMyProject: true,
      products: { biodiversity: 1, nutrients: 2 },
    },
    {
      title: 'My Project',
      subtitle: 'Field 1 & 2',
      cost: 170000,
      discountOrBonus: 42000,
      accepted: true,
      isMyProject: true,
      products: { biodiversity: 5, nutrients: 3 },
    },
  ],
  buyerProjects: [
    {
      title: 'Buyer 1',
      cost: 270000,
      accepted: true,
      discountOrBonus: 42000,
      products: { biodiversity: 1, nutrients: 4 }
    },
    {
      title: 'Buyer 2',
      cost: 120000,
      accepted: true,
      discountOrBonus: 5000,
      products: { biodiversity: 3, nutrients: 0 }
    },
  ],
  sellerProjects: [
    {
      title: 'Seller 1',
      cost: 90000,
      accepted: true,
      discountOrBonus: 42000,
      products: { biodiversity: 1, nutrients: 2 }
    },
  ],
  sidebarContent: {
    1: sidebarContentStage1,
    2: sidebarContentStage2,
    9: sidebarContentStage9,
    10: sidebarContentStage10,
  },
  options: {
    stages: 10,
    set_my_price: 2,
    allow_button_click: 2,
    show_calculating_overlay: [4, 6, 8],
    show_details_widget: 1,
    show_solve_market: 3,
    show_market_outcome: 5,
    show_calculating_winners: 4,
    show_distributing_surplus: 6,
    show_calculating_final: 8,
    show_surpluses: 7,
    show_final_payments: 9,
    show_balanced_market: 9,
    show_bids: 1,
    show_offers: 1,
    show_maps: false,
    show_full_map: 1,
    show_highlighted_map: 2,
    show_participants: 1,
    hide_next_button: [2, 3, 4, 5, 6, 7, 8, 10],
    hide_prev_button: [1],
    show_losers: 5,
    highlight_me: 3,
  }
}
