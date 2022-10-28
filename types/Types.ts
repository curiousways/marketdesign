export interface Data {
  title: string;
  project_cost: string;
  buyers: Buyer[];
  sellers: Seller[];
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
