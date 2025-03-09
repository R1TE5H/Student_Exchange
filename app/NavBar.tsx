import Link from "next/link";
import React from "react";
import { logOut } from "./logout/actions";
import { createClient } from "@/utils/supabase/server";

const NavBar = async () => {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  return (
    <nav className="flex justify-around text-xl text-white">
      <div className="invisible" />
      <div className="p-5 flex justify-between gap-5 bg-red-300">
        {!data.user && (
          <>
            <Link className="button" href={`/login`}>
              Login
            </Link>
            <Link className="button" href={`/register`}>
              Register
            </Link>
          </>
        )}
        <Link className="button" href={`/products`}>
          Products
        </Link>
        {data.user && (
          <>
            <Link className="button" href={`/users/${data.user.id}`}>
              Users Page
            </Link>
            <form>
              <button
                className="text-xl bg-purple-600 text-white p-4 rounded-md"
                formAction={logOut}
              >
                Log Out
              </button>
            </form>
          </>
        )}
      </div>
      <div className="invisible" />
    </nav>
  );
};

export default NavBar;
