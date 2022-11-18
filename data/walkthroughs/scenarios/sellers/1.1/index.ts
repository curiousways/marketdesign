import { sidebarContentStage1 } from "./sidebar-content/1";
import { sidebarContentStage2 } from "./sidebar-content/2";
import { sidebarContentStage3 } from "./sidebar-content/3";
import { sidebarContentStage4 } from "./sidebar-content/4";
import { sidebarContentStage5 } from "./sidebar-content/5";
import { sidebarContentStage11 } from "./sidebar-content/11";
import { WalkthroughScenario } from "@/types/walkthrough";

export const sellerScenario1_1: WalkthroughScenario = {
  myProjects: [
    {
      title: 'My Project',
      cost: 60000,
      accepted: () => true,
      discountOrBonus: 25000,
      products: { biodiversity: 2, nutrients: 3 }
    },
  ],
  buyerProjects: [
    {
      title: 'Buyer 1',
      cost: 200000,
      accepted: () => true,
      discountOrBonus: 67000,
      products: { biodiversity: 1, nutrients: 4 }
    },
    {
      title: 'Buyer 2',
      cost: 100000,
      accepted: () => true,
      discountOrBonus: 68000,
      products: { biodiversity: 0, nutrients: 2 }
    },
    {
      title: 'Buyer 3',
      cost: 120000,
      accepted: () => false,
      discountOrBonus: 0,
      products: { biodiversity: 4, nutrients: 0 }
    }
  ],
  sellerProjects: [
    {
      title: 'Seller 1',
      cost: 120000,
      accepted: () => false,
      discountOrBonus: 0,
      products: { biodiversity: 5, nutrients: 2 }
    },
    {
      title: 'Seller 2',
      cost: 50000,
      accepted: () => true,
      discountOrBonus: 30000,
      products: { biodiversity: 0, nutrients: 3 }
    }
  ],
  sidebarContent: {
    1: sidebarContentStage1,
    2: sidebarContentStage2,
    3: sidebarContentStage3,
    4: sidebarContentStage4,
    5: sidebarContentStage5,
    11: sidebarContentStage11,
  },
  options: {
    stages: 11,
    set_my_price: 4,
    allow_button_click: 4,
    show_details_widget: 2,
    show_costs: 3,
    show_maps: true,
    show_participants: 3,
  },
}
