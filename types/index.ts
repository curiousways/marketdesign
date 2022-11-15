export interface Data {
  title: string;
  project_cost: string;
  buyers: Buyer[];
  sellers: Seller[];
  sidebarContent?: {
    [key: number]: JSX.Element;
  },
  options: {
    [key: string]: any;
  };
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
