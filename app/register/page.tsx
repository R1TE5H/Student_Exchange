"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormDataType } from "./formData";
import { signup } from "./actions";
import schema from "./schema";

import InputField from "../components/InputField";

export default function RegisterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormDataType>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormDataType) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));

    const result = await signup(formData);

    if (result.success) {
      router.push(`/users/${result.userID}`);
    } else {
      console.error(result.error || result.errors);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-indigo-600">
      <div className="bg-white p-10 rounded-lg shadow-lg w-[40rem]">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Create Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-2 gap-5">
            <InputField
              label="First Name"
              name="first_name"
              type="text"
              register={register}
              errors={errors}
            />
            <InputField
              label="Last Name"
              name="last_name"
              type="text"
              register={register}
              errors={errors}
            />
          </div>

          <InputField
            label="Email"
            name="email"
            type="email"
            register={register}
            errors={errors}
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            register={register}
            errors={errors}
          />

          <InputField
            label="Confirm Password"
            name="confirm_password"
            type="password"
            register={register}
            errors={errors}
          />

          <div className="bg-black p-1 rounded text-center">
            <button
              className="w-full bg-black text-white font-bold py-3 px-6 rounded text-xl hover:bg-gray-900"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
