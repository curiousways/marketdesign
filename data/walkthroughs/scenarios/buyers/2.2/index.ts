import { WalkthroughScenario } from "@/types/walkthrough";
import { sidebarContent1 } from "./sidebar-content/1";
import { sidebarContent8 } from "./sidebar-content/8";

export const buyerScenario2_2: WalkthroughScenario = {
  myProjects: [
    {
      title: 'My Project',
      cost: 280000,
      accepted: true,
      discountOrBonus: 10000,
      products: { biodiversity: 3, nutrients: 3 }
    },
  ],
  buyerProjects: [
    {
      title: 'Buyer 1',
      cost: 240000,
      accepted: false,
      discountOrBonus: 0,
      products: { biodiversity: 3, nutrients: 1 }
    },
    {
      title: 'Buyer 2',
      cost: 260000,
      accepted: false,
      discountOrBonus: 0,
      products: { biodiversity: 4, nutrients: 2 }
    }
  ],
  sellerProjects: [
    {
      title: 'Seller 1',
      cost: 140000,
      accepted: true,
      discountOrBonus: 10000,
      products: { biodiversity: 4, nutrients: 3 }
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
