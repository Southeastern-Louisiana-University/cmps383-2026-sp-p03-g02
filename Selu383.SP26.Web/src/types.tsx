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

export interface Location {
  id: number;
  name: string;
  address: string;
}

export interface Order {
  id: number;
  userId: number;
  locationId: number;
  tableId: number;
  total: number;
  items: number[];
  createdAt: string;
}

export interface User {
  id: number;
  username: string;
  roles: string[];
}