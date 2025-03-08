export type FormDataType = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
};

export const fields = [
  { id: "first_name", name: "first_name", type: "text", label: "First Name" },
  { id: "last_name", name: "last_name", type: "text", label: "Last Name" },
  { id: "email", name: "email", type: "email", label: "Email" },
  { id: "password", name: "password", type: "password", label: "Password" },
  {
    id: "confirm_password",
    name: "confirm_password",
    type: "password",
    label: "Confirm Password",
  },
];
