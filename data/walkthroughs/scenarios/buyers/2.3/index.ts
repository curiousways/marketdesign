import { WalkthroughScenario } from "@/types/walkthrough";
import { sidebarContent1 } from "./sidebar-content/1";
import { sidebarContent8 } from "./sidebar-content/8";
import {  sidebarContent9 } from "./sidebar-content/9";

export const buyerScenario2_3: WalkthroughScenario = {
  myProjects: [
    {
      title: 'My Project',
      cost: 280000,
      accepted: true,
      discountOrBonus: 130000,
      products: { biodiversity: 3, nutrients: 3 }
    }
  ],
  buyerProjects: [],
  sellerProjects: [
    {
      title: 'Seller 1',
      cost: 140000,
      accepted: true,
      discountOrBonus: 10000,
      products: { biodiversity: 4, nutrients: 3 }
    },
    {
      title: 'Seller 2',
      cost: 120000,
      accepted: false,
      discountOrBonus: 0,
      products: { biodiversity: 3, nutrients: 2 }
    },
    {
      title: 'Seller 3',
      cost: 160000,
      accepted: false,
      discountOrBonus: 0,
      products: { biodiversity: 3, nutrients: 3 }
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
    show_details_widget: 1,
    show_costs: 1,
    show_maps: false,
    show_participants: 1,
  }
}
