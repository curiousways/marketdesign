import { WalkthroughScenario } from "@/types/walkthrough";
import { sidebarContent1 } from "./sidebar-content/1";
import { sidebarContent10 } from "./sidebar-content/10";
import { sidebarContent2 } from "./sidebar-content/2";
import { sidebarContent3 } from "./sidebar-content/3";

export const buyerScenario2_1: WalkthroughScenario = {
  myProjects: [
    {
      title: 'My Project',
      cost: 280000,
      accepted: true,
      discountOrBonus: 72000,
      products: { biodiversity: 3, nutrients: 3 }
    },
  ],
  buyerProjects: [
    {
      title: 'Buyer 1',
      cost: 240000,
      accepted: true,
      discountOrBonus: 61000,
      products: { biodiversity: 3, nutrients: 1 }
    },
    {
      title: 'Buyer 2',
      cost: 260000,
      accepted: true,
      discountOrBonus: 45000,
      products: { biodiversity: 4, nutrients: 2 }
    }
  ],
  sellerProjects: [
    {
      title: 'Seller 1',
      cost: 140000,
      accepted: true,
      discountOrBonus: 84000,
      products: { biodiversity: 4, nutrients: 3 }
    },
    {
      title: 'Seller 2',
      cost: 120000,
      accepted: true,
      discountOrBonus: 53000,
      products: { biodiversity: 3, nutrients: 2 }
    },
    {
      title: 'Seller 3',
      cost: 160000,
      accepted: true,
      discountOrBonus: 45000,
      products: { biodiversity: 3, nutrients: 3 }
    }
  ],
  sidebarContent: {
    1: sidebarContent1,
    2: sidebarContent2,
    3: sidebarContent3,
    10: sidebarContent10,
  },
  options: {
    stages: 10,
    set_my_price: 3,
    allow_button_click: 3,
    show_details_widget: 2,
    show_costs: 3,
    show_maps: true,
    show_participants: 3,
  }
}
