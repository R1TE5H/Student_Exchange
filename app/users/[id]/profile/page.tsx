import { getData } from "@/app/services/httpRequests";
import React from "react";

interface Props {
  params: { id: string };
}

const UserProfilePage = async ({ params: { id } }: Props) => {
  const user = await getData(`http://localhost:3001/api/users/${id}/profile`);
  return (
    <>
      <div>User {id} Profile Page</div>
      <div>{user}</div>
    </>
  );
};

export default UserProfilePage;
