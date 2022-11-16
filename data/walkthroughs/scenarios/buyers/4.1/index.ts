import { WalkthroughScenario } from '@/types/walkthrough';
import { sidebarContent1 } from './sidebar-content/1';
import { sidebarContent10 } from './sidebar-content/10';
import { sidebarContent2 } from './sidebar-content/2';
import { sidebarContent3 } from './sidebar-content/3';
import { sidebarContent4 } from './sidebar-content/4';

export const buyerScenario4_1: WalkthroughScenario = {
  myProjects: [
    {
      title: 'My Project',
      subtitle: 'Divisible',
      cost: 180000,
      accepted: () => 67,
      discountOrBonus: 19000,
      products: { biodiversity: 3, nutrients: 6 }
    },
  ],
  buyerProjects: [
    {
      title: 'Buyer 1',
      cost: 100000,
      accepted: () => true,
      discountOrBonus: 58000,
      products: { biodiversity: 2, nutrients: 1 }
    },
    {
      title: 'Buyer 2',
      cost: 130000,
      accepted: () => true,
      discountOrBonus: 43000,
      products: { biodiversity: 1, nutrients: 3 }
    }
  ],
  sellerProjects: [
    {
      title: 'Seller 1',
      cost: 60000,
      accepted: () => false,
      discountOrBonus: 25000,
      products: { biodiversity: 3, nutrients: 1 }
    },
    {
      title: 'Seller 2',
      cost: 100000,
      accepted: () => true,
      discountOrBonus: 20000,
      products: { biodiversity: 4, nutrients: 4 }
    },
    {
      title: 'Seller 3',
      cost: 80000,
      accepted: () => true,
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
    stages: 10,
    set_my_price: 3,
    allow_button_click: 3,
    allow_division: true,
    show_details_widget: 2,
    show_divisible_input: true,
    show_costs: 3,
    show_maps: true,
    show_participants: 3,
  },
}
