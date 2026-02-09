
export type Category =
  | 'Suits & Blazers' | 'Panjabi & Pajama' | 'Premium Shirts' | 'T-Shirts & Polos' | 'Trousers & Chinos'
  | 'Luxury Watches' | 'Leather Shoes' | 'Boots' | 'Ethnic Wear' | 'Western Coats'
  | 'Belts' | 'Bags & Backpacks' | 'Perfumes' | 'Sunglasses'
  | 'Accessories' | 'Activewear' | 'Loungewear' | 'Winter Essentials' | 'Grooming'
  | 'Gift Sets';


export interface Product {
  id: string;
  name: string;
  brand: string;
  category: Category;
  price: number;
  description: string;
  images: string[];
  sizes: string[];
  colors: string[];
  rating: number;
  stock: number;
  reviews: Review[];
  isNew?: boolean;
  isFeatured?: boolean;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CartItem extends Product {
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  address?: string;
}
