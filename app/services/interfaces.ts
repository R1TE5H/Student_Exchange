export interface User {
  id: string;
  name?: string;
  email: string;
  createdAt: Date;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  createdAt: Date;
}
