"use server"; // Ensure this is the first line

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server"; // Ensure correct import
import { prisma } from "@/prisma/client"; // Ensure correct import

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const {
    data: { user },
    error,
  } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect(`/users/${user?.id}`);
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const {
    data: { user },
    error,
  } = await supabase.auth.signUp(data);

  if (user) {
    await prisma.user.create({
      data: {
        id: user.id,
        email: user.email!,
      },
    });
    revalidatePath("/", "layout");
    redirect(`/`);
  }
  if (error) redirect("/error");
}
