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
    <form onSubmit={handleSubmit}>
      <div className="flex mb-5">
        {fields.map((field) => (
          <div key={field.id} className="flex flex-col mr-5">
            <label htmlFor={field.id}>{field.label}:</label>
            <input
              id={field.id}
              name={field.name}
              type={field.type}
              required
              value={formData[field.name as keyof FormDataType]}
              onChange={handleChange}
              className={`border p-2 rounded ${
                errors[field.name] ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors[field.name] && (
              <span className="text-red-500 text-sm">{errors[field.name]}</span>
            )}
          </div>
        ))}
      </div>
      {errors.general && <p className="text-red-500">{errors.general}</p>}
      <button className="button" type="submit" disabled={loading}>
        {loading ? "Submitting" : "Submit"}
      </button>
    </form>
  );
}
