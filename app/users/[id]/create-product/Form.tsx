"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import schema from "./schema";
import InputField from "@/app/components/InputField";

interface Props {
  id: string;
}

type FormDataType = {
  name: string;
  price: number;
  description: string;
  quantity: number;
  category: string;
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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_DOMAIN}/api/create-product`,
      {
        method: "POST",
        headers: {
          "user-id": id,
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();
    if (result.createdAt) {
      router.push(`/users/${result.userID}`);
    } else {
      console.error(result);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div>
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
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category
            </label>
            <select
              id="category"
              {...register("category", { required: "Category is required" })}
              className={`w-full border rounded px-3 py-2 ${
                errors.category ? "border-red-500" : "border-gray-300"
              }`}
              defaultValue=""
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Books">Books</option>
              <option value="Other">Other</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-xs mt-1">
                {errors.category.message}
              </p>
            )}
          </div>
        </div>
        <div className="bg-indigo-600p-1 rounded text-center">
          <button
            className="w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded text-xl hover:bg-gray-900"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Product"}
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
