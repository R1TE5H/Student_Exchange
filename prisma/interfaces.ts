export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  ratings: number[];
  products: Product[];
  watchList: WatchListItem[];
  cart: Product[];
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
  };
}
