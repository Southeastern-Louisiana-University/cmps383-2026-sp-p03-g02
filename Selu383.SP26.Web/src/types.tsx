// src/types.ts
export interface ItemGetDto {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  isSeasonal: boolean;
  type: string;
  ingredients: number[];
}

export interface CartItemGetDto {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export type UserGetDto = {
    id: number;
    userName: string;
    roles: string[];
}

export type IngredientGetDto = {
  id: number;
  name: string;
}

export type OrderGetDto = {
  id: number;
  total: number;
  items: number[];
  userId: number;
}

export type TableGetDto = {
  id: number;
  isOccupied: boolean;
  isReserved: boolean;
}