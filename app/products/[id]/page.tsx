import { AddToWatchList } from "@/app/components/AddTo";
import { Product, WatchListItem } from "@/prisma/interfaces";
import { createClient } from "@/utils/supabase/server";
import React from "react";

interface Props {
  params: { id: string };
}

const IndividualProductPage = async ({ params }: Props) => {
  const resolvedParams = await params;
  const { id } = await resolvedParams;

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_DOMAIN}/api/products/${id}`,
    {
      method: "GET",
    }
  );
  const product: Product = await data.json();

  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  let watchList: null | WatchListItem[] = null;

  if (user) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_DOMAIN}/api/watchlist`,
      {
        method: "GET",
        headers: {
          "user-id": user!.id,
        },
      }
    );
    watchList = await response.json();
  }

  return (
    <div className="product-card p-6 max-w-md mx-auto bg-gray-800 text-white rounded-xl shadow-md space-y-4">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt={product.name}
          className="w-full h-64 object-cover rounded-t-xl"
        />
      </figure>
      <h1 className="text-3xl font-bold text-white">{product.name}</h1>
      <p className="text-gray-200">Product ID: {product.id}</p>
      <p className="text-lg text-white">{product.description}</p>
      <p className="text-xl font-semibold text-white">Price: ${product.price}</p>
      <p className="text-gray-200">Quantity: {product.quantity}</p>
      <div className="mt-4">
        <p className="text-white">Creator: {product.creator.firstName} {product.creator.lastName}</p>
        <p className="text-gray-200">Email: {product.creator.email}</p>
      </div>
      {user && (
        <div className="mt-4">
          <AddToWatchList productID={product.id.toString()} userID={user.id} />
        </div>
      )}
      {product.creatorId == user?.id && (
        <div className="mt-4 p-2 bg-blue-50 border border-blue-200 rounded">
          <p className="font-bold">
            You are the creator of this product. You can edit or manage it.
          </p>
        </div>
      )}
      <div className="mt-4 p-2 bg-gray-700 border border-gray-600 rounded">
        <p className="text-xl font-medium text-white">Watch List Items</p>
        {watchList ? (
          watchList.map((item) => (
            <p key={item.productId} className="text-gray-200">{item.product.name}</p>
          ))
        ) : (
          <p className="text-gray-400">No items in watch list.</p>
        )}
      </div>
    </div>
  );
};

export default IndividualProductPage;
