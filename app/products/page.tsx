import React from "react";
import { Product } from "../services/interfaces";

interface Props {
  searchParams: { filter: string };
}

const ProductsDashboardPage = async ({ searchParams }: Props) => {
  const resolvedSearchParams = await searchParams;
  const { filter } = resolvedSearchParams;

  const data = await fetch(`${process.env.BASE_DOMAIN}/api/products`, {
    method: "GET",
  });
  const products: Product[] = await data.json();

  return (
    <>
      {filter ? <p>The Search Param is {filter}</p> : <p>Product Dash Board</p>}

      {products && (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <th>{product.id}</th>
                <td>{product.name}</td>
                <td>{product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default ProductsDashboardPage;
