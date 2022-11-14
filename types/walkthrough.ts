import { RoleId } from "./roles";

export interface WalkthroughOptions {
  total_bids: string;
  total_offers: string;
  surplus: string;
  next_walkthrough: string;
  next_walkthrough_title: string;
  stages: number;
  role: RoleId;
  set_my_price: number;
  allow_button_click: number;
  show_products_quantity?: number;
  show_calculating_overlay: number[];
  show_details_widget: number;
  show_solve_market: number;
  show_market_outcome: number;
  show_calculating_winners: number;
  show_distributing_surplus: number;
  show_calculating_final: number;
  show_surpluses: number;
  show_final_payments: number;
  show_balanced_market: number;
  show_bids: number;
  show_offers: number;
  show_maps: boolean;
  show_full_map: number;
  show_highlighted_map: number;
  show_participants: number;
  hide_next_button: number[];
  hide_prev_button: number[];
  show_losers: number;
  highlight_me: number;
};

export interface Data {
  title: string;
  project_cost: string;
  buyers: Buyer[];
  sellers: Seller[];
  sidebarContent?: {
    [key: number]: JSX.Element;
  },
  options: WalkthroughOptions;
}

export interface Buyer {
  id: number;
  title: string;
  bid: string;
  pays: string;
  discount: string;
  products: Products;
}

export interface Products {
  biodiversity: number;
  nutrients: number;
}

export interface Seller {
  id: number;
  title: string;
  offer: string;
  received: string;
  bonus: string;
  products: Products;
}

export interface Scenario {
  id: string,
  title: string,
  buyer: Data,
  seller: Data,
}

export interface Walkthrough {
  id: number;
  title: string;
  scenarios: Scenario[];
}
