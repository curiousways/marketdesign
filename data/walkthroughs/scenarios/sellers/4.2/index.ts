import { sidebarContentStage1 } from "./sidebar-content/1";
import { WalkthroughScenario } from "@/types/walkthrough";
import { sidebarContentStage8 } from "./sidebar-content/8";

export const sellerScenario4_2: WalkthroughScenario = {
  myProjects: [
    {
      title: 'My Project',
      subtitle: 'Project 1',
      cost: 140000,
      discountOrBonus: 0,
      accepted: () => false,
      isInactive: true,
      products: { biodiversity: 1, nutrients: 3 },
    },
    {
      title: 'My Project',
      subtitle: 'Project 2',
      cost: 180000,
      discountOrBonus: 50000,
      accepted: () => true,
      products: { biodiversity: 2, nutrients: 5 },
    },
  ],
  buyerProjects: [
    {
      title: 'Buyer 1',
      cost: 220000,
      accepted: () => true,
      discountOrBonus: 50000,
      products: { biodiversity: 1, nutrients: 4 }
    },
    {
      title: 'Buyer 2',
      cost: 120000,
      accepted: () => false,
      discountOrBonus: 0,
      products: { biodiversity: 3, nutrients: 0 }
    },
    {
      title: 'Buyer 3',
      cost: 100000,
      accepted: () => true,
      discountOrBonus: 40000,
      products: { biodiversity: 1, nutrients: 1 }
    }
  ],
  sellerProjects: [
    {
      title: 'Seller 1',
      cost: 90000,
      accepted: () => false,
      discountOrBonus: 0,
      products: { biodiversity: 1, nutrients: 3 }
    },
  ],
  sidebarContent: {
    1: sidebarContentStage1,
    8: sidebarContentStage8,
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
