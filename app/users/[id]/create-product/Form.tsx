"use client";
import React, { useState } from "react";
import schema from "./schema";
import { processFormData } from "./actions";

interface Props {
  id: string;
}

const Form = ({ id }: Props) => {
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = processFormData(
      Object.fromEntries(new FormData(e.target as HTMLFormElement)),
      ["price"]
    );

    const validate = schema.safeParse(data);

    if (!validate.success) {
      const newErrors: Record<string, string> = {};
      validate.error.errors.forEach((e) => {
        newErrors[e.path[0]] = e.message;
      });
      setErrors(newErrors);
      setLoading(false);
      console.log(errors);
      return;
    }

    const response = await fetch(`/api/users/${id}/create-product`, {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        price: data.price,
        userID: id,
      }),
    });
    console.log(await response.json());
    setLoading(false);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            step="0.01"
            min="0"
            onChange={handleChange}
            placeholder="Enter a price"
          />
          {errors.price && (
            <span className="text-red-500 text-sm">{errors.price}</span>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="name">Name:</label>

          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter a name"
            onChange={handleChange}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name}</span>
          )}
        </div>
        <button className="button" type="submit" disabled={loading}>
          {loading ? "Submitting" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Form;
