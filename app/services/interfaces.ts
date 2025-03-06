export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  createdAt: Date;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  createdAt: Date;
}
