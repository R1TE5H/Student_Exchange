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

  const data = await fetch(`${process.env.BASE_DOMAIN}/api/products`, {
    method: "GET",
  });
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
      <div className="flex gap-5 mb-5">
        <NavLink href="/products" label="Clear Sort" />
        <NavLink href="/products?sortOrder=name" label="Name" />
      </div>
      {products.length === 0 && (
        <div className="flex flex-col justify-center items-center">
          <p className="m-5 text-3xl font-bold">No Products Created</p>
          {user ? (
            <NavLink
              href={`/users/${user!.id}/create-product`}
              label="Create Product"
            />
          ) : (
            <NavLink href={`/login`} label="Login to Create Products" />
          )}
        </div>
      )}
      <div className="flex gap-5 m-5">
        {(filteredProducts || products).map((product) => (
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
                  {product.description} -- Need to add the tags to each product
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
