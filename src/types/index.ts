export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  images: string[];
  rating: {
    rate: number;
    count: number;
  };
  inWishlist?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface FilterOptions {
  category: string;
  minPrice: number;
  maxPrice: number;
  searchQuery: string;
  sortBy: string;
}

// Currency conversion rate (USD to INR)
export const USD_TO_INR = 83.5;