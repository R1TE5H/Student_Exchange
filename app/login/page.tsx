import { login } from "./actions";

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
      <button className="button" formAction={login}>
        Log in
      </button>
    </form>
  );
}
