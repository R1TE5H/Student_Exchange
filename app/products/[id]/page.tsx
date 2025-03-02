import { Product } from "@/app/services/interfaces";
import React from "react";

interface Props {
  params: { id: string };
}

const IndividualProductPage = async ({ params: { id } }: Props) => {
  const data = await fetch(`${process.env.BASE_DOMAIN}/api/products/${id}`);
  const product: Product = await data.json();

  return (
    <>
      <div>Product Number {id} Page</div>
      <div>
        {product.name}, {product.id}
      </div>
    </>
  );
};

export default IndividualProductPage;
