import Link from "next/link";
import React from "react";
import { logOut } from "./logout/actions";
import { createClient } from "@/utils/supabase/server";
import LogoutBtn from "./components/LogoutBtn";
import NavLink from "./components/NavLink";

const NavBar = async () => {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  return (
    <nav className="relative flex justify-between items-center px-10 py-10 bg-white ">
      {/* Light purple navbar background */}
      <div className="text-4xl font-extrabold text-indigo-600 tracking-widest uppercase">
        DUCKPOP
      </div>
      {/* Black box containing navigation links */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  flex j gap-8 bg-indigo-600 rounded-lg shadow-lg">
        {!data.user && (
          <>
            <NavLink href={`/login`} label="Login" />
            <NavLink href={`/register`} label="Register" />
          </>
        )}
        <NavLink href={`/products`} label="products" />

        {data.user && (
          <>
            <NavLink href={`/users/${data.user.id}`} label="Dashboard" />
            <LogoutBtn />
          </>
        )}
      </div>
      {data.user && (
        <NavLink href={`/users/${data.user.id}/my-cart`} label="Cart" />
      )}
    </nav>
  );
};

export default NavBar;
