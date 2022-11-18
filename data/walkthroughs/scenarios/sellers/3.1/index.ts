import { sidebarContentStage1 } from "./sidebar-content/1";
import { sidebarContentStage2 } from "./sidebar-content/2";
import { sidebarContentStage3 } from "./sidebar-content/3";
import { sidebarContentStage10 } from "./sidebar-content/10";
import { GetWalkthroughScenario } from "@/types/walkthrough";

export const getSellerScenario3_1: GetWalkthroughScenario = () => ({
  myProjects: [
    {
      title: 'My Project',
      cost: 100000,
      accepted: () => false,
      discountOrBonus: 0,
      products: { biodiversity: 2, nutrients: 1 }
    },
  ],
  buyerProjects: [
    {
      title: 'Buyer 1',
      cost: 350000,
      accepted: () => false,
      discountOrBonus: 0,
      products: { biodiversity: 6, nutrients: 8 }
    },
    {
      title: 'Buyer 2',
      cost: 280000,
      accepted: () => true,
      discountOrBonus: 45000,
      products: { biodiversity: 4, nutrients: 4 }
    },
    {
      title: 'Buyer 3',
      cost: 120000,
      accepted: () => true,
      discountOrBonus: 72000,
      products: { biodiversity: 3, nutrients: 0 }
    }
  ],
  sellerProjects: [
    {
      title: 'Seller 1',
      cost: 120000,
      accepted: () => true,
      discountOrBonus: 53000,
      products: { biodiversity: 7, nutrients: 6 }
    },
    {
      title: 'Seller 2',
      cost: 80000,
      accepted: () => false,
      discountOrBonus: 0,
      products: { biodiversity: 5, nutrients: 4 }
    }
  ],
  sidebarContent: {
    1: sidebarContentStage1,
    2: sidebarContentStage2,
    3: sidebarContentStage3,
    10: sidebarContentStage10,
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
});
