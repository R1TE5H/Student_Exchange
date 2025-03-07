"use server";

import { createClient } from "@/utils/supabase/server";
import schema from "./schema";

export async function login(formData: FormData) {
  const validation_data = Object.fromEntries(formData.entries());
  const validate = schema.safeParse(validation_data);

  if (!validate.success)
    return {
      error: `The provided data is invalid. Try again with the correct data`,
    };

  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const {
    data: { user },
    error,
  } = await supabase.auth.signInWithPassword(data);

  if (error) return { error: `There was an error: ${error.message}` };

  if (user) return { success: "User successfully logged in", userID: user.id };
}
