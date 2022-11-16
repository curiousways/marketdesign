import { WalkthroughScenario } from "@/types/walkthrough";
import { sidebarContentStage1 } from "./sidebar-content/1";
import { sidebarContentStage8 } from "./sidebar-content/8";

export const sellerScenario2_2: WalkthroughScenario = {
  myProjects: [
    {
      title: 'My Project',
      cost: 140000,
      accepted: () => true,
      discountOrBonus: 10000,
      products: { biodiversity: 4, nutrients: 3 }
    },
  ],
  buyerProjects: [
    {
      title: 'Buyer 1',
      cost: 280000,
      accepted: () => true,
      discountOrBonus: 130000,
      products: { biodiversity: 3, nutrients: 3 }
    }
  ],
  sellerProjects: [
    {
      title: 'Seller 1',
      cost: 120000,
      accepted: () => false,
      discountOrBonus: 0,
      products: { biodiversity: 3, nutrients: 2 }
    },
    {
      title: 'Seller 2',
      cost: 160000,
      accepted: () => false,
      discountOrBonus: 0,
      products: { biodiversity: 3, nutrients: 3 }
    }
  ],
  sidebarContent: {
    1: sidebarContentStage1,
    2: sidebarContentStage8,
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
