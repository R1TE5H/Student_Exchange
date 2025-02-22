import { getData } from "@/app/services/httpRequests";
import React from "react";

interface Props {
  params: { id: string };
}

const UserPage = async ({ params: { id } }: Props) => {
  const user = await getData(`http://localhost:3001/api/users/${id}`);

  return (
    <>
      <div>User {id}'s Page</div>
      <div>{user}</div>
    </>
  );
};

export default UserPage;
