"use server";

import { createClient } from "@/utils/supabase/server";
import schema from "./schema";

export async function login(formData: FormData) {
  const validation_data = Object.fromEntries(formData.entries());
  const validate = schema.safeParse(validation_data);

  if (!validate.success) {
    const errors: Record<string, string> = {};

    validate.error.errors.forEach((err) => {
      errors[err.path.join(".")] = err.message;
    });

    return {
      success: false,
      errors,
    };
  }

  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const {
    data: { user },
    error: supabaseError,
  } = await supabase.auth.signInWithPassword(data);

  if (supabaseError) {
    return {
      success: false,
      error: `Signup failed: ${supabaseError.message}`,
    };
  }
  if (user)
    return {
      success: true,
      message: "User successfully created",
      userID: user.id,
    };
  return { success: false, error: "Unexpected error occurred." };
}
