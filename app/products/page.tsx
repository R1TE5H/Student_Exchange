import React from "react";
import http from "../services/httpRequests";
import { Product } from "../services/interfaces";

interface Props {
  searchParams: { filter: string };
}

const ProductsDashboardPage = async ({ searchParams: { filter } }: Props) => {
  const data: Product[] = await http.GET("http://localhost:3000/api/products");

  return (
    <>
      {filter ? <p>The Search Param is {filter}</p> : <p>Product Dash Board</p>}
      <div>
        {data.map((product) => (
          <div key={product.id}>
            {product.name}, ${product.price},{" "}
            {product.createdAt.toLocaleString()}
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductsDashboardPage;
