"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/prisma/client";

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
  };

  const {
    data: { user },
    error,
  } = await supabase.auth.signUp(data);

  if (user) {
    await prisma.user.create({
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
        id: user.id,
        email: user.email!,
      },
    });
    revalidatePath("/", "layout");
    redirect(`/`);
  }
  if (error) redirect("/error");
}
