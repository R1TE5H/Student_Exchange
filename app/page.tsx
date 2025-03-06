import { redirect } from "next/navigation";

export default function Home() {
  redirect("/login");

  return (
    <div>
      This is the home page/page that people see at the root of the url{" "}
      <code>localhost:3000/</code>
    </div>
  );
}
