"use server";

import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/prisma/client";
import schema from "./schema";

export async function signup(formData: FormData) {
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

  // If good, then start sign up process

  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
  };

  const {
    data: { user },
    error: supabaseError,
  } = await supabase.auth.signUp(data);

  if (supabaseError) {
    return {
      success: false,
      error: `Signup failed: ${supabaseError.message}`,
    };
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

      return {
        success: true,
        message: "User successfully created",
        userID: user.id,
      };
    } catch (dbError: any) {
      console.error(`Database Error: ${dbError.message}`);
      return {
        success: false,
        error: "An error occurred while saving user data.",
      };
    }
  }

  return { success: false, error: "Unexpected error occurred." };
}
