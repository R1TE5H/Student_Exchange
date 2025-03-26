import { Product } from "@/prisma/interfaces";
import React from "react";

interface Props {
  params: { id: string };
}

const IndividualProductPage = async ({ params }: Props) => {
  const resolvedParams = await params;
  const { id } = await resolvedParams;

  const data = await fetch(`${process.env.BASE_DOMAIN}/api/products/${id}`, {
    method: "GET",
  });
  const product: Product = await data.json();

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
    </>
  );
};

export default IndividualProductPage;
