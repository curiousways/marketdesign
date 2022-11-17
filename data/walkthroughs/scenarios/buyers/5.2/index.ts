import { sidebarContentStage1 } from "./sidebar-content/1";
import { sidebarContentStage2 } from "./sidebar-content/2";
import { sidebarContentStage3 } from "./sidebar-content/3";
import { WalkthroughScenario } from "@/types/walkthrough";
import { sidebarContentStage11 } from "./sidebar-content/11";
import { sidebarContentStage10 } from "./sidebar-content/10";

export const buyerScenario5_2: WalkthroughScenario = {
  myProjects: [
    {
      title: 'My Project',
      subtitle: 'Biodiversity',
      cost: 100000,
      accepted: () => 50,
      discountOrBonus: 10000,
      products: { biodiversity: 4 },
      costPerCredit: 25000,
    },
    {
      title: 'My Project',
      subtitle: 'Water Quality',
      cost: 100000,
      accepted: () => 40,
      discountOrBonus: 6000,
      products: { nutrients: 10 },
      costPerCredit: 10000,
    },
  ],
  buyerProjects: [
    {
      title: 'Buyer 1',
      cost: 140000,
      accepted: () => true,
      discountOrBonus: 75000,
      products: { biodiversity: 1, nutrients: 3 },
    },
  ],
  sellerProjects: [
    {
      title: 'Seller 1',
      cost: 60000,
      accepted: () => true,
      discountOrBonus: 13000,
      products: { biodiversity: 2, nutrients: 3 },
    },
    {
      title: 'Seller 2',
      cost: 90000,
      accepted: () => false,
      discountOrBonus: 0,
      products: { biodiversity: 2, nutrients: 3 },
    },
    {
      title: 'Seller 3',
      cost: 60000,
      accepted: () => true,
      discountOrBonus: 5000,
      products: { biodiversity: 1, nutrients: 4 },
    },
  ],
  sidebarContent: {
    1: sidebarContentStage1,
    2: sidebarContentStage2,
    3: sidebarContentStage3,
    10: sidebarContentStage10,
    11: sidebarContentStage11,
  },
  options: {
    stages: 11,
    set_my_price: 3,
    allow_button_click: 3,
    show_details_widget: 2,
    show_costs: 3,
    show_maps: true,
    show_participants: 3,
  },
}
