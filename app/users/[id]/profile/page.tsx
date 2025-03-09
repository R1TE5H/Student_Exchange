import React from "react";
import { User } from "@/prisma/interfaces";

interface Props {
  params: { id: string };
}

const UserProfilePage = async ({ params }: Props) => {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const data = await fetch(`${process.env.BASE_DOMAIN}/api/users/${id}`, {
    method: "GET",
  });
  const user: User = await data.json();

  return (
    <>
      <p>Profile Page</p>
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
            <td>{user.name ? user.name : "No Name"}</td>
            <td>{user.email}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default UserProfilePage;
