
export type Category = 'Men' | 'Women' | 'Unisex';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: Category;
  imageUrl: string;
  sizes: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}
