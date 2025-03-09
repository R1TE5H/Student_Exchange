import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { User } from "@/prisma/interfaces";
import Link from "next/link";

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
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>{user.id}</th>
            <td>
              {user.firstName} {user.lastName}
            </td>
            <td>{user.email}</td>
            <td>
              {user.products.length > 0 ? (
                user.products.map((product) => (
                  <p key={product.id}>{product.name}</p>
                ))
              ) : (
                <p>None</p>
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <Link className="button" href={`/users/${id}/create-product`}>
        Create Product Page
      </Link>
    </>
  );
};

export default UserPage;
