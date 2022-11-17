import { sidebarContentStage1 } from "./sidebar-content/1";
import { sidebarContentStage2 } from "./sidebar-content/2";
import { sidebarContentStage3 } from "./sidebar-content/3";
import { sidebarContentStage12 } from "./sidebar-content/12";
import { WalkthroughScenario } from "@/types/walkthrough";
import { sidebarContentStage4 } from "./sidebar-content/4";
import { sidebarContentStage5 } from "./sidebar-content/5";

export const sellerScenario4_1: WalkthroughScenario = {
  myProjects: [
    {
      title: 'My Project',
      subtitle: 'Project 1',
      cost: 140000,
      discountOrBonus: 44000,
      accepted: true,
      products: { biodiversity: 1, nutrients: 3 },
    },
    {
      title: 'My Project',
      subtitle: 'Project 2',
      cost: 180000,
      discountOrBonus: 0,
      accepted: false,
      isInactive: true,
      products: { biodiversity: 2, nutrients: 5 },
    },
  ],
  buyerProjects: [
    {
      title: 'Buyer 1',
      cost: 220000,
      accepted: true,
      discountOrBonus: 7000,
      products: { biodiversity: 1, nutrients: 4 }
    },
    {
      title: 'Buyer 2',
      cost: 120000,
      accepted: true,
      discountOrBonus: 44000,
      products: { biodiversity: 3, nutrients: 0 }
    },
    {
      title: 'Buyer 3',
      cost: 100000,
      accepted: false,
      discountOrBonus: 0,
      products: { biodiversity: 1, nutrients: 1 }
    }
  ],
  sellerProjects: [
    {
      title: 'Seller 1',
      cost: 90000,
      accepted: true,
      discountOrBonus: 14000,
      products: { biodiversity: 1, nutrients: 3 }
    },
  ],
  sidebarContent: {
    1: sidebarContentStage1,
    2: sidebarContentStage2,
    3: sidebarContentStage3,
    4: sidebarContentStage4,
    5: sidebarContentStage5,
    12: sidebarContentStage12,
  },
  options: {
    stages: 12,
    set_my_price: 5,
    allow_button_click: 5,
    show_details_widget: 2,
    show_costs: 3,
    show_maps: true,
    show_participants: 4,
  }
}
