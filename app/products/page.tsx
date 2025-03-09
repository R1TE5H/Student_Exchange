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
      <div className="flex gap-5 mb-5">
        <Link className="button" href="/products">
          Clear Sort
        </Link>
        <Link className="button" href="/products?sortOrder=name">
          Name
        </Link>
      </div>
      <p>
        For Image upload using Cloudinary:
        https://www.perplexity.ai/search/store-a-picture-in-supabase-po-WcOM9VZWSHGFniU5CGIWXw
      </p>
      <div className="flex gap-5 m-5">
        {products &&
          products.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id}>
              <div className="card bg-base-100 w-96 shadow-md hover:scale-105 transform transition duration-300">
                <figure>
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">
                    {product.name} | ${product.price}
                    <div className="badge bg-blue-500">NEW</div>
                  </h2>
                  <p>
                    {product.description} -- Need to add the tags to each
                    product
                  </p>
                  <div className="card-actions justify-end">
                    <div className="badge badge-outline">Fashion</div>
                    <div className="badge badge-outline">Products</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
};

export default ProductsDashboardPage;
