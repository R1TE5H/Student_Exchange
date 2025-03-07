import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { User } from "@/app/services/interfaces";

interface Props {
  params: { id: string };
}

const UserPage = async ({ params }: Props) => {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    throw new Error("403 Error: Unauthorized. Login to Proceed");
  }
  if (data.user.id != id) {
    redirect(`/users/${data.user.id}`);
  }

  const response = await fetch(`${process.env.BASE_DOMAIN}/api/users/${id}`, {
    method: "GET",
  });
  const user: User = await response.json();

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>{user.id}</th>
            <td>
              {user.first_name} {user.last_name}
            </td>
            <td>{user.email}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default UserPage;
