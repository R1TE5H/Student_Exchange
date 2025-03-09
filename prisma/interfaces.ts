export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  ratings: number[];
  products: Product[];
}

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  creatorId: string;
  creator: User;
  createdAt: Date;
}
