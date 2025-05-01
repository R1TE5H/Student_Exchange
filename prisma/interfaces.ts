export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  ratings: number[];
  products: Product[];
  watchList: WatchListItem[];
  cart: CartItem[];
}

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  quantity: number;
  createdAt: Date;
  creatorId: string;
  creator: User;
  tag: string;
}

export interface WatchListItem {
  userId: string;
  productId: string;
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
    quantity: number;
    createdAt: string;
    creatorId: string;
    tag: string;
  };
}
export interface CartItem {
  userId: string;
  productId: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
    quantity: number;
    createdAt: string;
    creatorId: string;
    tag: string;
  };
}

export interface Notification {
  id: string;
  buyerId: string;
  creatorId: string;
  productId: string;
  quantity: number;
  createdAt: Date;
  buyer: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: Date;
  };
  product: Product;
}
