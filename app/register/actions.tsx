"use server";

import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/prisma/client";
import schema from "./schema";

export async function signup(formData: FormData) {
  // Validate first because if there is an issue we do not want to waste processor time
  const validation_data = Object.fromEntries(formData.entries());
  const validate = schema.safeParse(validation_data);

  if (!validate.success)
    return {
      error: `The provided data is invalid. Try again with the correct data`,
    };

  // If good, then start process

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

  if (error) {
    return { error: `There was an error: ${error.code} - ${error.message}` };
  }

  if (user) {
    try {
      await prisma.user.create({
        data: {
          first_name: data.first_name,
          last_name: data.last_name,
          id: user.id,
          email: user.email!,
        },
      });
      return { success: "User successfully created" };
    } catch (error: any) {
      console.log(`There was a DB error: ${error}`);
      return { error: `There was an error uploading the user to the DB` };
    }
  }
  return { error: "An unexpected error has occurred." };
}
