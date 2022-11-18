import { GetWalkthroughScenario, WalkthroughScenario } from "@/types/walkthrough";
import { sidebarContent1 } from "./sidebar-content/1";
import { sidebarContent12 } from "./sidebar-content/12";
import { sidebarContent2 } from "./sidebar-content/2";
import { sidebarContent3 } from "./sidebar-content/3";
import { sidebarContent4 } from "./sidebar-content/4";
import { sidebarContent5 } from "./sidebar-content/5";
import { sidebarContent6 } from "./sidebar-content/6";

export const getGenericScenario1_1: GetWalkthroughScenario = () => ({
  myProjects: [
    {
      title: 'My Project',
      cost: 120000,
      discountOrBonus: 12500,
      accepted: () => true,
      products: { biodiversity: 1, nutrients: 3 },
    },
  ],
  buyerProjects: [
    {
      title: 'Buyer 1',
      cost: 100000,
      discountOrBonus: 7500,
      accepted: () => true,
      products: { biodiversity: 2, nutrients: 2 }
    },
    {
      title: 'Buyer 2',
      cost: 110000,
      discountOrBonus: 0,
      accepted: () => false,
      products: { biodiversity: 3, nutrients: 0 }
    }
  ],
  sellerProjects: [
    {
      title: 'Seller 1',
      cost: 120000,
      discountOrBonus: 25000,
      accepted: () => false,
      products: { biodiversity: 3, nutrients: 1 }
    },
    {
      title: 'Seller 2',
      cost: 80000,
      discountOrBonus: 7500,
      accepted: () => true,
      products: { biodiversity: 2, nutrients: 1 }
    },
    {
      title: 'Seller 3',
      cost: 100000,
      discountOrBonus: 12500,
      accepted: () => true,
      products: { biodiversity: 1, nutrients: 4 }
    },
  ],
  sidebarContent: {
    1: sidebarContent1,
    2: sidebarContent2,
    3: sidebarContent3,
    4: sidebarContent4,
    5: sidebarContent5,
    6: sidebarContent6,
    12: sidebarContent12,
  },
  options: {
    stages: 12,
    set_my_price: 5,
    allow_button_click: 5,
    show_details_widget: 2,
    show_costs: 3,
    show_maps: true,
    show_participants: 3,
  },
});
