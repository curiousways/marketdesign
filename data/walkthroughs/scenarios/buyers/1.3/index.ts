import { WalkthroughScenario } from "@/types/walkthrough";
import { sidebarContent1 } from "./sidebar-content/1";
import { sidebarContent8 } from "./sidebar-content/8";

export const buyerScenario1_3: WalkthroughScenario = {
  myProjects: [
    {
      title: 'My Project',
      cost: 80000,
      discountOrBonus: 0,
      accepted: () => false,
      products: { biodiversity: 1, nutrients: 3 },
    },
  ],
  buyerProjects: [
    {
      title: 'Buyer 1',
      cost: 100000,
      accepted: () => true,
      discountOrBonus: 2500,
      products: { biodiversity: 2, nutrients: 2 }
    },
    {
      title: 'Buyer 2',
      cost: 110000,
      accepted: () => true,
      discountOrBonus: 2500,
      products: { biodiversity: 3, nutrients: 0 }
    }
  ],
  sellerProjects: [
    {
      title: 'Seller 1',
      cost: 120000,
      accepted: () => true,
      discountOrBonus: 2500,
      products: { biodiversity: 3, nutrients: 1 }
    },
    {
      title: 'Seller 2',
      cost: 80000,
      accepted: () => true,
      discountOrBonus: 2500,
      products: { biodiversity: 2, nutrients: 1 }
    },
    {
      title: 'Seller 3',
      cost: 100000,
      accepted: () => false,
      discountOrBonus: 0,
      products: { biodiversity: 1, nutrients: 4 }
    }
  ],
  sidebarContent: {
    1: sidebarContent1,
    8: sidebarContent8,
  },
  options: {
    stages: 8,
    set_my_price: 1,
    allow_button_click: 1,
    show_details_widget: 1,
    show_costs: 1,
    show_maps: false,
    show_participants: 1,
  }
}
