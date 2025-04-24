"use client";
import React, { useState } from "react";

interface Props {
  userID: string;
  productID: string;
  initialStatus: boolean;
}

export const CartToggle = ({ userID, productID, initialStatus }: Props) => {
  const [isInCart, setIsInCart] = useState(initialStatus);

  return isInCart ? (
    <RemoveFromCart
      userID={userID}
      productID={productID}
      onSuccessfulRemove={() => setIsInCart(false)}
    />
  ) : (
    <AddToCart
      userID={userID}
      productID={productID}
      onSuccessfulAdd={() => setIsInCart(true)}
    />
  );
};

interface ComponentProps {
  userID: string;
  productID: string;
  onSuccessfulAdd?: () => void;
  onSuccessfulRemove?: () => void;
}

const AddToCart = ({ userID, productID, onSuccessfulAdd }: ComponentProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleClick = async () => {
    if (isSubmitting || isSubmitted) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_DOMAIN}/api/cart`,
        {
          method: "POST",
          body: JSON.stringify({ productId: productID, quantity: 1 }),
          headers: {
            "Content-Type": "application/json",
            "user-id": userID,
          },
        }
      );

      const result = await response.json();
      if (result.userId) {
        setIsSubmitted(true);
        onSuccessfulAdd?.();
      }
    } catch (error) {
      console.error("Error adding to Cart:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="justify-center flex">
      <button
        onClick={handleClick}
        className="text-xl p-5 font-bold bg-indigo-600 tracking-wide text-white uppercase rounded-lg hover:text-purple-400"
        disabled={isSubmitting || isSubmitted}
      >
        {isSubmitted
          ? "Added to Cart"
          : isSubmitting
          ? "Adding..."
          : "Add to Cart"}
      </button>
    </div>
  );
};

const RemoveFromCart = ({
  userID,
  productID,
  onSuccessfulRemove,
}: ComponentProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleClick = async () => {
    if (isSubmitting || isSubmitted) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_DOMAIN}/api/cart`,
        {
          method: "DELETE",
          body: JSON.stringify({ productId: productID }),
          headers: {
            "Content-Type": "application/json",
            "user-id": userID,
          },
        }
      );

      const result = await response.json();
      if (result.userId) {
        setIsSubmitted(true);
        onSuccessfulRemove?.();
      }
    } catch (error) {
      console.error("Error removing from Cart:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="justify-center flex">
      <button
        onClick={handleClick}
        className="text-xl p-5 font-bold bg-indigo-600 tracking-wide text-white uppercase rounded-lg hover:text-purple-400"
        disabled={isSubmitting || isSubmitted}
      >
        {isSubmitted
          ? "Removed from Cart"
          : isSubmitting
          ? "Removing..."
          : "Remove From Cart"}
      </button>
    </div>
  );
};
