"use client";
import NavLink from "@/app/components/NavLink";
import { CartItem } from "@/prisma/interfaces";
import React, { useState } from "react";

interface Props {
  cart: CartItem[];
}

const CheckoutButton = ({ cart }: Props) => {
  const [complete, setComplete] = useState(false);
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
  };

  const handleClick = () => {
    cart.forEach(({ productId, product, quantity, userId }) => {
      createNotification(productId, quantity, product.creatorId, userId);
    });
    setComplete(true);
  };

  return (
    <div className="flex justify-between">
      <button
        className={`text-xl p-5 font-bold bg-indigo-600 tracking-wide text-white uppercase rounded-lg hover:text-purple-400`}
        onClick={handleClick}
      >
        Notify Creators
      </button>
      {complete && (
        <NavLink href={`/users/${cart[0].userId}`} label="Dashboard" key={1} />
      )}
    </div>
  );
};

export default CheckoutButton;
