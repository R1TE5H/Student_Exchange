import React from "react";
import Link from "next/link";
import { sort } from "fast-sort";
import { Product } from "../services/interfaces";

interface Props {
  searchParams: { sortOrder: string };
}

const ProductsDashboardPage = async ({ searchParams }: Props) => {
  const resolvedSearchParams = await searchParams;
  const { sortOrder: filter } = resolvedSearchParams;

  const data = await fetch(`${process.env.BASE_DOMAIN}/api/products`, {
    method: "GET",
  });
  const products: Product[] = await data.json();

  const filteredProducts = filter
    ? sort(products).asc(
        filter == "name" ? (product) => product.name : (product) => product.id
      )
    : null;

  return (
    <>
      <div>
        <Link className="button" href="/products">
          Clear Sort
        </Link>
        <Link className="button" href="/products?sortOrder=name">
          Name
        </Link>
      </div>

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
            {(filteredProducts || products).map((product) => (
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
