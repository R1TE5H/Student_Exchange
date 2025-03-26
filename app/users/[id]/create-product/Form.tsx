"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import schema from "./schema";
import InputField from "@/app/components/InputField";

// import { processFormData } from "./actions"; Might be able to delete this when implementing the form

interface Props {
  id: string;
}

type FormDataType = {
  name: string;
  price: number;
  description: string;
  quantity: number;
};

const Form = ({ id }: Props) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormDataType>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormDataType) => {
    const response = await fetch(`/api/users/${id}/create-product`, {
      method: "POST",
      headers: {
        "user-id": id,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (result.createdAt) {
      router.push(`/users/${result.userID}`);
    } else {
      console.error(result[0].message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Name"
          name="name"
          type="text"
          register={register}
          errors={errors}
        />
        <InputField
          label="Price"
          name="price"
          type="number"
          register={register}
          errors={errors}
        />
        <InputField
          label="Quantity"
          name="quantity"
          type="number"
          register={register}
          errors={errors}
        />
        <InputField
          label="Description"
          name="description"
          type="text"
          register={register}
          errors={errors}
        />
        <div className="bg-black p-1 rounded text-center">
          <button
            className="w-full bg-black text-white font-bold py-3 px-6 rounded text-xl hover:bg-gray-900"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Login"}
          </button>
        </div>
      </form>
      {/* <button
        onClick={onSubmit}
        className="bg-indigo-600 p-5 text-xl text-white rounded-lg"
      >
        Submit Form
      </button> */}
    </>
  );
};

export default Form;
