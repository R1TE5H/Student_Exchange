import { signup } from "./actions";
import React from "react";
import schema from "./schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
    {
      id: "confirm_password",
      name: "confirm_password",
      type: "password",
      label: "Confirm Password",
    },
  ];

  const handleSubmit = async (data: FormData) => {
    "use server";

    const formData = Object.fromEntries(data.entries());
    const validate = schema.safeParse(formData);

    if (validate.success) {
      const confirmation = await signup(data);
      if (confirmation.success) {
        revalidatePath("/", "layout");
        redirect(`/`);
      } else {
        console.log(confirmation.error);
      }
    }
    validate.error?.errors.forEach((e) => console.log(e.message));
  };

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
      <button className="button" formAction={handleSubmit}>
        Sign up
      </button>
    </form>
  );
}
