import React from "react";
import { getData } from "@/app/services/httpRequests";
import { User } from "@/app/services/interfaces";

interface Props {
  params: { id: string };
}

const UserProfilePage = async ({ params: { id } }: Props) => {
  const user: User = await getData(`http://localhost:3001/api/users/${id}`);
  return (
    <>
      <div>User {id} Profile Page</div>
      <div>{user.name}</div>
    </>
  );
};

export default UserProfilePage;
