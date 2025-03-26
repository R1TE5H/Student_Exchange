"use client";
import React, { useState } from "react";

interface Props {
  userID: string;
  productID: string;
}

export const AddToWatchList = ({ userID, productID }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleClick = async () => {
    if (isSubmitting || isSubmitted) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_DOMAIN}/api/watchlist`,
        {
          method: "POST",
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
      }
      console.log(result);
    } catch (error) {
      console.error("Error adding to watchlist:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <p>
        {productID} {userID}
      </p>
      <button
        onClick={handleClick}
        className="text-xl p-5 font-bold bg-indigo-600 tracking-wide text-white uppercase rounded-lg hover:text-purple-400"
        disabled={isSubmitting || isSubmitted}
      >
        {isSubmitted
          ? "Added to Watch List"
          : isSubmitting
          ? "Adding..."
          : "Add to Watch List"}
      </button>
    </>
  );
};
