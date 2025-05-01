"use client";
import { CartItem } from "@/prisma/interfaces";
import React from "react";

interface Props {
  cart: CartItem[];
}

const CheckoutButton = ({ cart }: Props) => {
  const createNotification = async (
    productId: string,
    quantity: number,
    creatorId: string,
    buyerId: string
  ) => {
    console.log(productId, quantity, creatorId, buyerId);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_DOMAIN}/api/notify`,
      {
        method: "POST",
        body: JSON.stringify({
          productId: productId,
          quantity: quantity,
          creatorId: creatorId,
          buyerId: buyerId,
        }),
      }
    );

    console.log(await response.json());
  };

  const handleClick = () => {
    cart.forEach(({ productId, product, quantity, userId }) => {
      createNotification(productId, quantity, product.creatorId, userId);
    });
  };

  return (
    <button
      className={`text-xl p-5 font-bold bg-indigo-600 tracking-wide text-white uppercase rounded-lg hover:text-purple-400`}
      onClick={handleClick}
    >
      Notify Creators
    </button>
  );
};

export default CheckoutButton;
