import { AddToWatchList } from "@/app/components/AddTo";
import { Product } from "@/prisma/interfaces";
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
    </>
  );
};

export default IndividualProductPage;
