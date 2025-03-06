import { signup } from "./actions";
import React from "react";

export default function LoginPage() {
  const fields = [
    {
      id: "first_name",
      name: "first_name",
      type: "text",
      label: "First Name",
    },
    {
      id: "last_name",
      name: "last_name",
      type: "text",
      label: "Last Name",
    },
    {
      id: "email",
      name: "email",
      type: "email",
      label: "Email",
    },
    {
      id: "password",
      name: "password",
      type: "password",
      label: "Password",
    },
  ];

  return (
    <form>
      <div className="flex mb-5">
        {fields.map((field, index) => (
          <div key={index} className="flex flex-col mr-5">
            <label htmlFor={field.name}>{field.label}:</label>
            <input id={field.id} name={field.name} type={field.type} required />
          </div>
        ))}
      </div>
      <button className="button" formAction={signup}>
        Sign up
      </button>
    </form>
  );
}
