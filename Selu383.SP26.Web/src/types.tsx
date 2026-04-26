// src/types.ts
export interface Item {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  isSeasonal: boolean;
  type: string;
  ingredients: number[];
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}