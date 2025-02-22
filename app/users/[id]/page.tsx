import React from "react";
import http from "@/app/services/httpRequests";
import { User } from "@/app/services/interfaces";

interface Props {
  params: { id: string };
}

const UserPage = async ({ params: { id } }: Props) => {
  const user: User = await http.GET(`http://localhost:3000/api/users/${id}`);

  return (
    <>
      <div>User {id}'s Page</div>
      <div>{user.name}</div>
    </>
  );
};

export default UserPage;
