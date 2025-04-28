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
    <div className="max-w-3xl mx-auto p-6 bg-gray-800 text-white rounded-xl shadow-md space-y-4">
      <table className="table-auto w-full text-left bg-gray-700 rounded-md shadow-lg">
        <thead className="bg-gray-900 text-white">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Listed Products</th>
            <th>Watch List</th>
            <th>Cart</th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 text-gray-200">
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
            <td className="items-start flex flex-col">
              {user.cart.length > 0 ? (
                user.cart.map((item) => (
                  <div key={`${item.product.id}_cart`}>
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
      <div className="mt-4">
        <NavLink
          href={`/users/${user!.id}/create-product`}
          label="Create Product"
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
        />
      </div>
    </div>
  );
};

export default UserPage;
