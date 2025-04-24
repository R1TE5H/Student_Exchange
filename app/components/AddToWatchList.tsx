"use client";
import React, { useState } from "react";

interface Props {
  userID: string;
  productID: string;
  initialStatus: boolean;
}

export const WatchlistToggle = ({
  userID,
  productID,
  initialStatus,
}: Props) => {
  const [isInWatchlist, setIsInWatchlist] = useState(initialStatus);

  return isInWatchlist ? (
    <RemoveFromWatchList
      userID={userID}
      productID={productID}
      onSuccessfulRemove={() => setIsInWatchlist(false)}
    />
  ) : (
    <AddToWatchList
      userID={userID}
      productID={productID}
      onSuccessfulAdd={() => setIsInWatchlist(true)}
    />
  );
};

interface ComponentProps {
  userID: string;
  productID: string;
  onSuccessfulAdd?: () => void;
  onSuccessfulRemove?: () => void;
}

const AddToWatchList = ({
  userID,
  productID,
  onSuccessfulAdd,
}: ComponentProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
        onSuccessfulAdd?.();
      }
    } catch (error) {
      console.error("Error adding to watchlist:", error);
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
          ? "Added to Watch List"
          : isSubmitting
          ? "Adding..."
          : "Add to Watch List"}
      </button>
    </div>
  );
};

const RemoveFromWatchList = ({
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
        `${process.env.NEXT_PUBLIC_BASE_DOMAIN}/api/watchlist`,
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
      console.error("Error removing from watchlist:", error);
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
          ? "Removed from Watch List"
          : isSubmitting
          ? "Removing..."
          : "Remove From Watch List"}
      </button>
    </div>
  );
};
