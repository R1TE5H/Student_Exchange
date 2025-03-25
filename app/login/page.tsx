"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormDataType } from "./formData";
import { login } from "./actions";
import schema from "./schema";
import InputField from "../components/InputField";

export default function LoginPage() {
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

    const result = await login(formData);

    if (result.success) {
      router.push(`/users/${result.userID}`);
    } else {
      console.error(result.error || result.errors);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div
        className="bg-indigo-600 text-white p-10 rounded-lg shadow-lg"
        style={{ width: "500px" }}
      >
        <h2 className="text-3xl font-bold text-center mb-5">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <InputField
            label="Email"
            label_color="text-white"
            name="email"
            type="email"
            register={register}
            errors={errors}
          />

          <InputField
            label="Password"
            label_color="text-white"
            name="password"
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
              {isSubmitting ? "Submitting..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
