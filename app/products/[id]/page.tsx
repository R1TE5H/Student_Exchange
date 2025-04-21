import { WatchlistToggle } from "@/app/components/AddTo";
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
      <p className="text-lg text-white">{product.description}</p>
      <p className="text-xl font-semibold text-white">
        Price: ${product.price}
      </p>
      <p className="text-gray-200">Quantity: {product.quantity}</p>
      <div className="mt-4">
        <p className="text-white">
          Creator: {product.creator.firstName} {product.creator.lastName}
        </p>
        <p className="text-white">
          Creator Rating: {product.creator.firstName} {product.creator.lastName}
        </p>
      </div>
      {user ? (
        <WatchlistToggle
          userID={user!.id}
          productID={product!.id.toString()}
          initialStatus={
            watchList?.some(
              (item) => item.productId === product.id.toString()
            ) as boolean
          }
        />
      ) : (
        <div>Login to add to a cart or watch list</div>
      )}
      {product.creatorId == user?.id && (
        <div className="mt-4 p-2 rounded">
          <p className="font-bold">
            You are the creator of this product. You can edit or manage it.
          </p>
        </div>
      )}
    </div>
  );
};

export default IndividualProductPage;
