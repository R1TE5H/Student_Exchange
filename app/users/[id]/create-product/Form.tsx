"use client";

import React from "react";
import schema from "./schema";
// import { processFormData } from "./actions"; Might be able to delete this when implementing the form

interface Props {
  id: string;
}

const Form = ({ id }: Props) => {
  const handleSubmit = async (e: React.FormEvent) => {
    const data = {
      name: "Product",
      quantity: 1,
      price: 1.7,
      description: "This is a test for the API from the frontend",
    };

    const response = await fetch(`/api/users/${id}/create-product`, {
      method: "POST",
      headers: {
        "user-id": id,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);
  };

  return (
    <>
      <button
        onClick={handleSubmit}
        className="bg-indigo-600 p-5 text-xl text-white rounded-lg"
      >
        Submit Form
      </button>
    </>
  );
};

export default Form;
