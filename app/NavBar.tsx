import Link from "next/link";
import React from "react";
import { logOut } from "./logout/actions";
import { createClient } from "@/utils/supabase/server";

const NavBar = async () => {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  return (
    <nav className="flex justify-between items-center px-10 py-4 bg-purple-300 shadow-md">
      {/* Light purple navbar background */}

      {/* Website Name "DUCKPOP" in the top right corner */}
      <div className="text-4xl font-extrabold text-gray-900 tracking-widest uppercase">
        DUCKPOP
      </div>

      {/* Black box containing navigation links */}
      <div className="p-5 flex justify-between gap-8 bg-black text-white rounded-lg shadow-lg">
        {!data.user && (
          <>
            <Link
              className="text-xl font-bold tracking-wide uppercase hover:text-purple-400"
              href={`/login`}
            >
              Login
            </Link>
            <Link
              className="text-xl font-bold tracking-wide uppercase hover:text-purple-400"
              href={`/register`}
            >
              Register
            </Link>
          </>
        )}
        <Link
          className="text-xl font-bold tracking-wide uppercase hover:text-purple-400"
          href={`/products`}
        >
          Products
        </Link>
        {data.user && (
          <>
            <Link
              className="text-xl font-bold tracking-wide uppercase hover:text-purple-400"
              href={`/users/${data.user.id}`}
            >
              Users Page
            </Link>
            <form>
              <button
                className="text-xl bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-md"
                formAction={logOut}
              >
                Log Out
              </button>
            </form>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
