import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { User } from "@/prisma/interfaces";
import NavLink from "@/app/components/NavLink";
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

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_DOMAIN}/api/users/${id}`,
    {
      method: "GET",
    }
  );
  const user: User = await response.json();

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Listed Products</th>
            <th>Watch List</th>
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
                  <div key={product.id}>
                    <Link href={`/products/${product.id}`}>{product.name}</Link>
                  </div>
                ))
              ) : (
                <p>None</p>
              )}
            </td>
            <td>
              {user.watchList.length > 0 ? (
                user.watchList.map((item) => (
                  <div key={item.product.id}>
                    <Link href={`/products/${item.productId}`}>
                      {item.product.name}
                    </Link>
                  </div>
                ))
              ) : (
                <p>None</p>
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <NavLink
        href={`/users/${user!.id}/create-product`}
        label="Create Product"
      />
    </>
  );
};

export default UserPage;
