import { Product } from "@/app/services/interfaces";
import React from "react";

interface Props {
  params: { id: string };
}

const IndividualProductPage = async ({ params: { id } }: Props) => {
  const data = await fetch(`http://localhost:3000/api/products/${id}`);
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
