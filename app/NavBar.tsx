import Link from "next/link";
import React from "react";
import { logOut } from "./logout/actions";

const NavBar = async () => {
  const links = [
    {
      url: "/login",
      label: "Login",
    },
    {
      url: "/products",
      label: "Products",
    },
    {
      url: "/register",
      label: "Register",
    },
  ];

  return (
    <nav className="flex justify-around text-xl text-white">
      <div className="invisible" />
      <div className="p-5 flex justify-between bg-red-300">
        {links.map((link, index) => (
          <Link key={index} className="button" href={link.url}>
            {link.label}
          </Link>
        ))}

        <form>
          <button
            className="text-xl bg-purple-600 text-white p-4 rounded-md"
            formAction={logOut}
          >
            Log Out
          </button>
        </form>
      </div>
      <div className="invisible" />
    </nav>
  );
};

export default NavBar;
