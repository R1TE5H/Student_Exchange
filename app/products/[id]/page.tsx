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
    <>
      <div>{product.name}</div>
      <div>{product.id}</div>
      <div>{product.description}</div>
      <div>{product.price}</div>
      <div>{product.quantity}</div>
      <div>
        {product.creator.firstName} {product.creator.lastName}
      </div>
      <div>{product.creator.email}</div>
      {user && (
        <AddToWatchList productID={product.id.toString()} userID={user.id} />
      )}
      {product.creatorId == user?.id && (
        <p className="font-bold">
          The current user and product creator are the same. The current user
          can edit the current product. Need to create a button and
          functionality that enables the user to edit
        </p>
      )}
      <p className="text-xl">
        Watch List Items below. This api can be used to check if the current
        product is in the watch list
      </p>
      {watchList &&
        watchList.map((item) => (
          <p key={item.productId}>{item.product.name}</p>
        ))}
    </>
  );
};

export default IndividualProductPage;
