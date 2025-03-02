import React from "react";
import { User } from "@/app/services/interfaces";

interface Props {
  params: { id: string };
}

const UserPage = async ({ params: { id } }: Props) => {
  const data = await fetch(`http://localhost:3000/api/users/${id}`);
  const user: User = await data.json();

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
            <td>{user.name ? user.name : "No Name"}</td>
            <td>{user.email}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default UserPage;
