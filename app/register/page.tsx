"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FormDataType, fields } from "./formData";
import { signup } from "./actions";
import schema from "./schema";

export default function RegisterPage() {
  const [formData, setFormData] = useState<FormDataType>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const validation_data = Object.fromEntries(
      new FormData(e.target as HTMLFormElement).entries()
    );

    const validate = schema.safeParse(validation_data);

    if (!validate.success) {
      const newErrors: Record<string, string> = {};
      validate.error.errors.forEach((e) => {
        newErrors[e.path[0]] = e.message;
      });
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    const formDataObject = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      formDataObject.append(key, value)
    );

    const result = await signup(formDataObject);

    if (!result.success) {
      if (result.errors) setErrors(result.errors);
      else setErrors({ general: result.error });
    } else {
      router.push(`/users/${result.userID}`);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-purple-700">
      {/* Full-screen purple background */}

      <div className="bg-white p-10 rounded-lg shadow-lg w-[40rem]">
        {/* White square inside purple background */}

        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Create Account
        </h2>
        {/* Centered heading with gray text */}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex space-x-5">
            {/* First Name & Last Name in one line */}
            <div className="flex flex-col w-1/2">
              <label htmlFor="first_name" className="font-bold text-gray-700">
                First Name
              </label>
              <input
                id="first_name"
                name="first_name"
                type="text"
                required
                value={formData.first_name}
                onChange={handleChange}
                className="border p-3 rounded bg-gray-100 text-gray-900"
              />
            </div>

            <div className="flex flex-col w-1/2">
              <label htmlFor="last_name" className="font-bold text-gray-700">
                Last Name
              </label>
              <input
                id="last_name"
                name="last_name"
                type="text"
                required
                value={formData.last_name}
                onChange={handleChange}
                className="border p-3 rounded bg-gray-100 text-gray-900"
              />
            </div>
          </div>

          <div className="flex flex-col">
            {/* Email */}
            <label htmlFor="email" className="font-bold text-gray-700">
              Email <span className="text-gray-500 text-sm">(.edu only)</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="border p-3 rounded bg-gray-100 text-gray-900 w-full"
            />
          </div>

          <div className="flex flex-col">
            {/* Password */}
            <label htmlFor="password" className="font-bold text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="border p-3 rounded bg-gray-100 text-gray-900 w-full"
            />
          </div>

          {errors.general && (
            <p className="text-red-500 text-sm">{errors.general}</p>
          )}
          {/* Error message */}

          {/* Sign Up Button with black background inside white box */}
          <div className="bg-black p-1 rounded text-center">
            <button
              className="w-full bg-black text-white font-bold py-3 px-6 rounded text-xl hover:bg-gray-900"
              type="submit"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
