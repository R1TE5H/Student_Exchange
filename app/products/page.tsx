import React from "react";
import Link from "next/link";
import { sort } from "fast-sort";
import { Product } from "../../prisma/interfaces";

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
              <th>Creator Name</th>
              <th>Creator Email</th>
            </tr>
          </thead>
          <tbody>
            {(filteredProducts || products).map((product) => (
              <tr key={product.id}>
                <th>{product.id}</th>
                <td>
                  <Link href={`/products/${product.id}`}>{product.name}</Link>
                </td>
                <td>{product.price}</td>
                <td>
                  {product.creator.firstName} {product.creator.lastName}
                </td>
                <td>{product.creator.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            Card Title
            <div className="badge bg-blue-500">NEW</div>
          </h2>
          <p>
            A card component has a figure, a body part, and inside body there
            are title and actions parts
          </p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline">Fashion</div>
            <div className="badge badge-outline">Products</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsDashboardPage;
