import { revalidatePath } from "next/cache";
import { login } from "./actions";
import schema from "./schema";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const fields = [
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

  const handleSubmit = async (data: FormData) => {
    "use server";
    const formData = Object.fromEntries(data.entries());
    const validate = schema.safeParse(formData);

    if (validate.success) {
      const confirmation = await login(data);

      if (confirmation?.success) {
        revalidatePath("/", "layout");
        redirect(`/users/${confirmation.userID}`);
      } else {
        console.log(confirmation?.error);
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
        Log in
      </button>
    </form>
  );
}
