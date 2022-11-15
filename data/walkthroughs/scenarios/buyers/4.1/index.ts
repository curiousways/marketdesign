import { WalkthroughData } from '@/types/walkthrough';
import { sidebarContent1 } from './sidebar-content/1';
import { sidebarContent10 } from './sidebar-content/10';
import { sidebarContent2 } from './sidebar-content/2';
import { sidebarContent3 } from './sidebar-content/3';
import { sidebarContent4 } from './sidebar-content/4';

export const buyerScenario4_1: WalkthroughData = {
  myProjects: [
    {
      title: 'My Project',
      subtitle: 'Divisible',
      cost: 180000,
      accepted: 67,
      discountOrBonus: 19000,
      isMyProject: true,
      products: { biodiversity: 3, nutrients: 6 }
    },
  ],
  buyerProjects: [
    {
      title: 'Buyer 1',
      cost: 100000,
      accepted: true,
      discountOrBonus: 58000,
      products: { biodiversity: 2, nutrients: 1 }
    },
    {
      title: 'Buyer 2',
      cost: 130000,
      accepted: true,
      discountOrBonus: 43000,
      products: { biodiversity: 1, nutrients: 3 }
    }
  ],
  sellerProjects: [
    {
      title: 'Seller 1',
      cost: 60000,
      accepted: false,
      discountOrBonus: 25000,
      products: { biodiversity: 3, nutrients: 1 }
    },
    {
      title: 'Seller 2',
      cost: 100000,
      accepted: true,
      discountOrBonus: 20000,
      products: { biodiversity: 4, nutrients: 4 }
    },
    {
      title: 'Seller 3',
      cost: 80000,
      accepted: true,
      discountOrBonus: 30000,
      products: { biodiversity: 3, nutrients: 4 }
    }
  ],
  sidebarContent: {
    1: sidebarContent1,
    2: sidebarContent2,
    3: sidebarContent3,
    4: sidebarContent4,
    10: sidebarContent10,
  },
  options: {
    total_bids: '350,000',
    total_offers: '180,000',
    surplus: '170,000',
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
    highlight_me: 4
  },
}
