import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";
import Form from "./Form";

interface Props {
  params: { id: string };
}

const CreateProductPage = async ({ params }: Props) => {
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

  return (
    <>
      <div className="max-w-3xl mx-auto p-6 space-y-4">
        <p className="font-bold text-3xl">List a New Product</p>
        <div className="max-w-3xl">
          <Form id={id} />
        </div>
      </div>
    </>
  );
};

export default CreateProductPage;
