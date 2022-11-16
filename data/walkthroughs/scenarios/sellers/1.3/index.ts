import { WalkthroughScenario } from "@/types/walkthrough";
import { sidebarContentStage1 } from "./sidebar-content/1";
import { sidebarContentStage8 } from "./sidebar-content/8";

export const sellerScenario1_3: WalkthroughScenario = {
  myProjects: [
    {
      title: 'My Project',
      cost: 100000,
      accepted: false,
      discountOrBonus: 0,
      products: { biodiversity: 2, nutrients: 3 }
    },
  ],
  buyerProjects: [
    {
      title: 'Buyer 1',
      cost: 200000,
      accepted: true,
      discountOrBonus: 37000,
      products: { biodiversity: 1, nutrients: 4 }
    },
    {
      title: 'Buyer 2',
      cost: 100000,
      accepted: false,
      discountOrBonus: 0,
      products: { biodiversity: 0, nutrients: 2 }
    },
    {
      title: 'Buyer 3',
      cost: 120000,
      accepted: true,
      discountOrBonus: 21000,
      products: { biodiversity: 4, nutrients: 0 }
    }
  ],
  sellerProjects: [
    {
      title: 'Seller 1',
      cost: 120000,
      accepted: true,
      discountOrBonus: 21000,
      products: { biodiversity: 5, nutrients: 2 }
    },
    {
      title: 'Seller 2',
      cost: 50000,
      accepted: true,
      discountOrBonus: 71000,
      products: { biodiversity: 0, nutrients: 3 }
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
