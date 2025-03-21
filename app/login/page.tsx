"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FormDataType, fields } from "./formData";
import { login } from "./actions";
import schema from "./schema";

export default function LoginPage() {
  const [formData, setFormData] = useState<FormDataType>({
    email: "",
    password: "",
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

    const result = await login(formDataObject);

    if (!result.success) {
      if (result.errors) setErrors(result.errors);
      else setErrors({ general: result.error });
    } else {
      router.push(`/users/${result.userID}`);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      {/* White background added */}
      <div className="bg-purple-700 text-white p-10 rounded-lg shadow-lg w-96">
        {/* Purple square background with white text */}
        <h2 className="text-2xl font-bold text-center mb-5">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.id} className="flex flex-col">
              <label htmlFor={field.id} className="font-bold mb-1">
                {field.label}
              </label>
              <input
                id={field.id}
                name={field.name}
                type={field.type}
                required
                value={formData[field.name as keyof FormDataType]}
                onChange={handleChange}
                className={`border p-2 rounded bg-white text-black ${
                  errors[field.name] ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors[field.name] && (
                <span className="text-red-500 text-sm">{errors[field.name]}</span>
              )}
            </div>
          ))}

          {errors.general && <p className="text-red-500">{errors.general}</p>}

          {/* Black square around the button */}
          <div className="bg-black p-1 rounded">
            <button
              className="w-full bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-900"
              type="submit"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Sign In"}
            </button>
          </div>

          {/* Sign-up link */}
          <p className="text-center mt-4">
            Don't have an account?{" "}
            <a href="/register" className="text-white font-bold underline">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
