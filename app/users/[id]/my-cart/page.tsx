import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { User, CartItem } from "@/prisma/interfaces";

interface Props {
  params: { id: string };
}

const MyCart = async ({ params }: Props) => {
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

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_DOMAIN}/api/cart`, {
    method: "GET",
    headers: {
      "user-id": data.user.id,
    },
  });

  const cart: CartItem[] = await res.json();
  const totalCost = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-800 text-white rounded-xl shadow-md space-y-4">
      <table className="table-auto w-full text-left bg-gray-700 rounded-md shadow-lg">
        <thead className="bg-gray-900 text-white">
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 text-gray-200">
          {cart.map((item) => (
            <tr key={item.productId}>
              <th>{item.product.name}</th>
              <td>
                {item.product.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
              <td>{item.product.quantity}</td>
              <td>
                {(item.product.quantity * item.product.price).toLocaleString(
                  "en-US",
                  {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )}
              </td>
            </tr>
          ))}
          <tr>
            <th>Total</th>
            <td />
            <td />
            <th>
              {totalCost.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MyCart;
