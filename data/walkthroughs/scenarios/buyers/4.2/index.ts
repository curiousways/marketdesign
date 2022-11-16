import { WalkthroughData } from '@/types/walkthrough';
import { sidebarContent1 } from './sidebar-content/1';
import { sidebarContent8 } from './sidebar-content/8';
import { sidebarContent9 } from './sidebar-content/9';

export const buyerScenario4_2: WalkthroughData = {
  myProjects: [
    {
      title: 'My Project',
      cost: 180000,
      accepted: false,
      discountOrBonus: 0,
      isMyProject: true,
      products: { biodiversity: 3, nutrients: 6 }
    },
  ],
  buyerProjects: [
    {
      title: 'Buyer 1',
      cost: 100000,
      accepted: true,
      discountOrBonus: 73000,
      products: { biodiversity: 2, nutrients: 1 }
    },
    {
      title: 'Buyer 2',
      cost: 130000,
      accepted: true,
      discountOrBonus: 53000,
      products: { biodiversity: 1, nutrients: 3 }
    }
  ],
  sellerProjects: [
    {
      title: 'Seller 1',
      cost: 60000,
      accepted: false,
      discountOrBonus: 0,
      products: { biodiversity: 3, nutrients: 1 }
    },
    {
      title: 'Seller 2',
      cost: 100000,
      accepted: false,
      discountOrBonus: 9,
      products: { biodiversity: 4, nutrients: 4 }
    },
    {
      title: 'Seller 3',
      cost: 80000,
      accepted: true,
      discountOrBonus: 23000,
      products: { biodiversity: 3, nutrients: 4 }
    }
  ],
  sidebarContent: {
    1: sidebarContent1,
    8: sidebarContent8,
    9: sidebarContent9,
  },
  options: {
    stages: 9,
    set_my_price: 1,
    allow_button_click: 1,
    show_calculating_overlay: [3, 5, 7],
    show_details_widget: 1,
    show_divisible_input: true,
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
  },
}
