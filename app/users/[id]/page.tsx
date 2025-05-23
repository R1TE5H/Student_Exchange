import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { User } from "@/prisma/interfaces";
import NavLink from "@/app/components/NavLink";
import Link from "next/link";
import DashboardTable from "./DashboardTable";
import NotificationTable from "./NotificationTable";

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
    <div className="max-w-3xl mx-auto p-6 bg-gray-800 text-white rounded-xl shadow-md space-y-4 flex flex-col gap-5">
      <h1 className="font-bold text-3xl">Account Details</h1>
      <DashboardTable user={user} />
      <h1 className="font-bold text-3xl">Notifications</h1>
      <NotificationTable userId={data.user.id} />
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
