import React from "react";
import Link from "next/link";
import { sort } from "fast-sort";
import { Product } from "../../prisma/interfaces";
import { createClient } from "@/utils/supabase/server";
import NavLink from "../components/NavLink";

interface Props {
  searchParams: { sortOrder: string };
}

const ProductsDashboardPage = async ({ searchParams }: Props) => {
  const resolvedSearchParams = await searchParams;
  const { sortOrder: filter } = resolvedSearchParams;

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_DOMAIN}/api/products`,
    {
      method: "GET",
    }
  );
  const products: Product[] = await data.json();

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const filteredProducts = filter
    ? sort(products).asc(
        filter == "name"
          ? (product) => product.name
          : (product) => product.createdAt
      )
    : null;

  return (
    <>
      <div className="flex gap-5 mb-5 justify-center px-5">
        <NavLink href="/products" label="Clear Sort" />
        <NavLink href="/products?sortOrder=name" label="Name" />
        {user && (
          <NavLink
            href={`/users/${user!.id}/create-product`}
            label="Create Product"
          />
        )}
      </div>
      {products.length === 0 && (
        <div className="flex flex-col justify-center items-center">
          <p className="m-5 text-3xl font-bold">No Products Created</p>
          {!user && (
            <NavLink href={`/login`} label="Login to Create Products" />
          )}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-5 place-items-center">
        {(filteredProducts || products).map((product) => (
          <Link href={`/products/${product.id}`} key={product.id}>
            <div className="card bg-gray-800 text-white max-w-xs w-full shadow-md hover:scale-105 transform transition duration-300">
              <figure>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-white">
                  {product.name} | ${product.price}
                  <div className="badge bg-blue-500 text-white">NEW</div>
                </h2>
                <p className="text-gray-300">
                  {product.description} -- Need to add the tags to each product
                </p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline text-white border-white">Fashion</div>
                  <div className="badge badge-outline text-white border-white">Products</div>
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
