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
  modifications?: string;
}

export type UserGetDto = {
    id: number;
    userName: string;
    roles: string[];
}

export type LocationGetDto = {
    id: number;
    name: string;
    address: string;
    tableCount: number;
    managerId: number;
}

export type IngredientGetDto = {
  id: number;
  name: string;
}

export type OrderGetDto = {
  id: number;
  userId: number;
  userName: string;
  locationId: number;
  tableId: number;
  total: number;
  items: number[];        // not needed anymore since we're sending orderItem
  orderItem: {
    id: number;
    itemId: number;
    itemName: string;
    modifications: string;
    ingredients?: IngredientGetDto[];
  }[];
  createdAt: string;
  status: string;
}

export type TableGetDto = {
  id: number;
  isOccupied: boolean;
  isReserved: boolean;
}