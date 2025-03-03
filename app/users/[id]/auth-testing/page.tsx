import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { User } from "@/app/services/interfaces";

interface Props {
  params: { id: string };
}

export default async function AuthTestingPage({ params }: Props) {
  const supabase = await createClient();

  const resolvedParams = await params;
  const { id } = resolvedParams;

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }
  if (data.user.id != id) {
    redirect(`/users/${id}`);
  }

  const response = await fetch(`${process.env.BASE_DOMAIN}/api/users/${id}`, {
    method: "GET",
  });
  const user: User = await response.json();

  return <p>Hello {data.user.email}</p>;
}
