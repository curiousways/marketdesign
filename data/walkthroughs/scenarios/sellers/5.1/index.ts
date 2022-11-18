import { sidebarContentStage1 } from "./sidebar-content/1";
import { sidebarContentStage2 } from "./sidebar-content/2";
import { sidebarContentStage3 } from "./sidebar-content/3";
import { sidebarContentStage10 } from "./sidebar-content/10";
import { GetWalkthroughScenario } from "@/types/walkthrough";

export const getSellerScenario5_1: GetWalkthroughScenario = () => ({
  myProjects: [
    {
      title: 'My Project',
      subtitle: 'Field 1',
      cost: 140000,
      discountOrBonus: 0,
      accepted: () => false,
      products: { biodiversity: 4, nutrients: 1 },
    },
    {
      title: 'My Project',
      subtitle: 'Field 2',
      cost: 70000,
      discountOrBonus: 37000,
      accepted: () => true,
      products: { biodiversity: 1, nutrients: 2 },
    },
  ],
  buyerProjects: [
    {
      title: 'Buyer 1',
      cost: 270000,
      accepted: () => true,
      discountOrBonus: 37000,
      products: { biodiversity: 1, nutrients: 4 }
    },
    {
      title: 'Buyer 2',
      cost: 120000,
      accepted: () => false,
      discountOrBonus: 0,
      products: { biodiversity: 3, nutrients: 0 }
    },
  ],
  sellerProjects: [
    {
      title: 'Seller 1',
      cost: 90000,
      accepted: () => true,
      discountOrBonus: 37000,
      products: { biodiversity: 1, nutrients: 2 }
    },
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
