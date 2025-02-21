export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  imageUrl: string;
  rating: number;
  reviews: number;
  price: {
    value: number;
    currency: string;
  };
  durabilityScore: number;
  valueScore: number;
  pros: string[];
  cons: string[];
  purchaseLinks: {
    name: string;
    url: string;
  }[];
}

export type Category = {
  id: string;
  name: string;
  icon: string;
};
