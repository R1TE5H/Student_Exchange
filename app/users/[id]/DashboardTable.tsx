import { User } from "@/prisma/interfaces";
import Link from "next/link";
import React from "react";

interface Props {
  user: User;
}

const DashboardTable = ({ user }: Props) => {
  return (
    <div>
      <table className="table-auto w-full text-left bg-gray-700 rounded-md shadow-lg">
        <thead className="bg-gray-900 text-white">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Listed Products</th>
            <th>Watch List</th>
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
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DashboardTable;
